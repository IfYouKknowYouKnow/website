// macOS: swift scripts/annotate-saving-videos.swift <Flutter demos directory> <output directory>
// Ports TapMarkerPainter from the app. The fingertip is the position anchor;
// the glove flips at the right/bottom edges to stay inside the phone screen.
import AVFoundation
import AppKit
import ImageIO
import QuartzCore
import UniformTypeIdentifiers

struct Cue: Decodable {
    let start: Double
    let end: Double
    let label: String
    let tap: [Double]?
}
struct Recording: Decodable {
    let file: String
    let cues: [Cue]
}
struct Catalog: Decodable { let recordings: [Recording] }

func glove(size: Int, fromLeft: Bool, fromAbove: Bool) -> CGImage {
    let context = CGContext(data: nil, width: size, height: size, bitsPerComponent: 8,
                            bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(),
                            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    context.translateBy(x: CGFloat(size) / 2, y: CGFloat(size) / 2)
    context.scaleBy(x: fromLeft ? -1 : 1, y: fromAbove ? 1 : -1)
    context.rotate(by: -0.45)
    let scale = CGFloat(size) / 48 * 0.68
    context.scaleBy(x: scale, y: scale)
    context.translateBy(x: -15.5, y: -3.5)

    let hand = CGMutablePath()
    hand.move(to: CGPoint(x: 12, y: 35))
    hand.addLine(to: CGPoint(x: 3, y: 25))
    hand.addCurve(to: CGPoint(x: 3.5, y: 18), control1: CGPoint(x: 0, y: 22), control2: CGPoint(x: 1, y: 19))
    hand.addCurve(to: CGPoint(x: 12, y: 23), control1: CGPoint(x: 6, y: 17), control2: CGPoint(x: 8, y: 19))
    hand.addLine(to: CGPoint(x: 12, y: 6))
    hand.addCurve(to: CGPoint(x: 19, y: 6), control1: CGPoint(x: 12, y: 1), control2: CGPoint(x: 19, y: 1))
    hand.addLine(to: CGPoint(x: 19, y: 19))
    hand.addCurve(to: CGPoint(x: 26, y: 20), control1: CGPoint(x: 20, y: 16), control2: CGPoint(x: 25, y: 16))
    hand.addCurve(to: CGPoint(x: 32, y: 22), control1: CGPoint(x: 28, y: 17), control2: CGPoint(x: 32, y: 18))
    hand.addCurve(to: CGPoint(x: 38, y: 26), control1: CGPoint(x: 35, y: 20), control2: CGPoint(x: 38, y: 22))
    hand.addLine(to: CGPoint(x: 38, y: 33))
    hand.addCurve(to: CGPoint(x: 33, y: 44), control1: CGPoint(x: 38, y: 39), control2: CGPoint(x: 33, y: 40))
    hand.addLine(to: CGPoint(x: 17, y: 44))
    hand.addCurve(to: CGPoint(x: 12, y: 35), control1: CGPoint(x: 17, y: 40), control2: CGPoint(x: 14, y: 39))
    hand.closeSubpath()

    context.saveGState()
    context.setShadow(offset: CGSize(width: 0, height: 2.5), blur: 2.5,
                      color: CGColor(red: 0.055, green: 0.102, blue: 0.141, alpha: 0.4))
    context.setFillColor(CGColor(gray: 1, alpha: 1))
    context.addPath(hand)
    context.fillPath()
    context.restoreGState()
    context.saveGState()
    context.addPath(hand)
    context.clip()
    let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: [
        CGColor(gray: 1, alpha: 1),
        CGColor(red: 0.941, green: 0.953, blue: 0.961, alpha: 1),
    ] as CFArray, locations: [0, 1])!
    context.drawLinearGradient(gradient, start: .zero, end: CGPoint(x: 40, y: 48), options: [])
    context.restoreGState()

    let outline = CGColor(red: 0.2, green: 0.255, blue: 0.298, alpha: 1)
    context.setStrokeColor(outline)
    context.setLineWidth(1.6)
    context.setLineCap(.round)
    context.setLineJoin(.round)
    context.addPath(hand)
    context.strokePath()
    let folds = CGMutablePath()
    folds.move(to: CGPoint(x: 12, y: 23))
    folds.addQuadCurve(to: CGPoint(x: 17, y: 29), control: CGPoint(x: 16, y: 25))
    for (x, top, bottom) in [(23.0, 22.0, 28.0), (29.0, 23.0, 29.0), (34.5, 25.0, 30.0)] {
        folds.move(to: CGPoint(x: x, y: top))
        folds.addLine(to: CGPoint(x: x, y: bottom))
    }
    context.setStrokeColor(CGColor(red: 0.471, green: 0.518, blue: 0.553, alpha: 1))
    context.setLineWidth(1.2)
    context.addPath(folds)
    context.strokePath()
    let cuff = CGPath(roundedRect: CGRect(x: 15.5, y: 40, width: 19, height: 7), cornerWidth: 2, cornerHeight: 2, transform: nil)
    context.setFillColor(CGColor(gray: 1, alpha: 1))
    context.setStrokeColor(outline)
    context.setLineWidth(1.6)
    context.addPath(cuff)
    context.drawPath(using: .fillStroke)
    return context.makeImage()!
}

func annotate(_ recording: Recording, source: URL, output: URL) async throws {
    let asset = AVURLAsset(url: source.appendingPathComponent("\(recording.file).mp4"))
    let duration = try await asset.load(.duration)
    let seconds = CMTimeGetSeconds(duration)
    let composition = AVMutableVideoComposition(propertiesOf: asset)
    composition.frameDuration = CMTime(value: 1, timescale: 30)
    let size = composition.renderSize
    let parent = CALayer()
    parent.frame = CGRect(origin: .zero, size: size)
    let video = CALayer()
    video.frame = parent.bounds
    parent.addSublayer(video)

    for (index, cue) in recording.cues.enumerated() {
        guard let tap = cue.tap else { continue }
        precondition(tap.count == 2 && tap.allSatisfy { (0...1).contains($0) })
        precondition(cue.start >= 0 && cue.end > cue.start && cue.end <= seconds)
        let side = size.width * 0.30
        let hand = CALayer()
        hand.frame = CGRect(x: tap[0] * size.width - side / 2,
                            y: (1 - tap[1]) * size.height - side / 2,
                            width: side, height: side)
        hand.contents = glove(size: 324, fromLeft: tap[0] > 0.75, fromAbove: tap[1] > 0.85)
        hand.opacity = 0

        let visibility = CAKeyframeAnimation(keyPath: "opacity")
        visibility.keyTimes = cue.start == 0 ? [0, NSNumber(value: cue.end / seconds), 1]
            : [0, NSNumber(value: cue.start / seconds), NSNumber(value: cue.end / seconds), 1]
        visibility.values = cue.start == 0 ? [1, 0, 0] : [0, 1, 0, 0]
        visibility.calculationMode = .discrete
        visibility.beginTime = AVCoreAnimationBeginTimeAtZero
        visibility.duration = seconds
        visibility.fillMode = .both
        visibility.isRemovedOnCompletion = false
        hand.add(visibility, forKey: "tap-\(index)")

        let press = CABasicAnimation(keyPath: "transform.scale")
        press.fromValue = 1
        press.toValue = 0.92
        press.duration = 0.55
        press.autoreverses = true
        press.repeatCount = .infinity
        press.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
        press.beginTime = AVCoreAnimationBeginTimeAtZero
        hand.add(press, forKey: "press")
        parent.addSublayer(hand)
    }

    composition.animationTool = AVVideoCompositionCoreAnimationTool(postProcessingAsVideoLayer: video, in: parent)
    let destination = output.appendingPathComponent("\(recording.file)-guided.mp4")
    if FileManager.default.fileExists(atPath: destination.path) {
        try FileManager.default.removeItem(at: destination)
    }
    let exporter = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetHighestQuality)!
    exporter.videoComposition = composition
    exporter.shouldOptimizeForNetworkUse = true
    exporter.fileLengthLimit = Int64(seconds * 240_000)
    try await exporter.export(to: destination, as: .mp4)

    let generator = AVAssetImageGenerator(asset: AVURLAsset(url: destination))
    generator.appliesPreferredTrackTransform = true
    let (frame, _) = try await generator.image(at: CMTime(seconds: 0.3, preferredTimescale: 600))
    let poster = output.appendingPathComponent("\(recording.file)-guided-poster.jpg")
    let writer = CGImageDestinationCreateWithURL(poster as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
    CGImageDestinationAddImage(writer, frame, [kCGImageDestinationLossyCompressionQuality: 0.85] as CFDictionary)
    guard CGImageDestinationFinalize(writer) else { fatalError("Unable to save poster") }
    print("\(recording.file): \(Int(size.width))×\(Int(size.height)), \(seconds)s, \(recording.cues.filter { $0.tap != nil }.count) timed pointing hands")
}

guard CommandLine.arguments.count == 3 else {
    fatalError("Usage: swift scripts/annotate-saving-videos.swift <source directory> <output directory>")
}
let source = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let catalogURL = URL(fileURLWithPath: #filePath).deletingLastPathComponent().appendingPathComponent("saving-video-cues.json")
let catalog = try JSONDecoder().decode(Catalog.self, from: Data(contentsOf: catalogURL))
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
for recording in catalog.recordings {
    try await annotate(recording, source: source, output: output)
}
