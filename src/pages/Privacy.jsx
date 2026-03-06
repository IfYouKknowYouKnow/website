import { Link } from 'react-router-dom'
import styles from './Privacy.module.css'

export default function Privacy() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link to="/" className={`gradient-text ${styles.logo}`}>IYKYK</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={`container ${styles.content}`}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: March 2026</p>

          <section className={styles.section}>
            <p>IYKYK is a social app for sharing place recommendations with friends. This policy explains what personal data we collect and how we use it.</p>
          </section>

          <section className={styles.section}>
            <h2>1. Data we collect</h2>
            <h3>Account data</h3>
            <ul>
              <li>Name, email address, and profile photo</li>
            </ul>
            <h3>Location data</h3>
            <ul>
              <li>Device location, used to show nearby places on the map</li>
            </ul>
            <h3>User-generated content</h3>
            <ul>
              <li>Photos you upload to recommend places</li>
              <li>Place recommendations and vibes (tags and descriptions you write)</li>
            </ul>
            <h3>Social data</h3>
            <ul>
              <li>Friend connections within the app</li>
              <li>Places sent to or received from friends</li>
              <li>Likes on photos and places</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. Third-party services</h2>
            <p>IYKYK uses the following third-party services:</p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Supabase</td>
                  <td>Database, authentication, file storage</td>
                </tr>
                <tr>
                  <td>Mapbox</td>
                  <td>Maps and place search</td>
                </tr>
                <tr>
                  <td>Anthropic (Claude)</td>
                  <td>AI identification of places from photos</td>
                </tr>
                <tr>
                  <td>Google Maps</td>
                  <td>External sharing of places</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className={styles.section}>
            <h2>3. Data retention</h2>
            <p>We retain your data for as long as your account is active. If you request account deletion, your personal data is removed within 30 days.</p>
          </section>

          <section className={styles.section}>
            <h2>4. Data deletion</h2>
            <p>You can request deletion of your account and all associated data at any time by emailing <a href="mailto:privacy@ifykyk.app">privacy@ifykyk.app</a>.</p>
          </section>

          <section className={styles.section}>
            <h2>5. Children</h2>
            <p>IYKYK is not intended for users under the age of 13. We do not knowingly collect data from children under 13.</p>
          </section>

          <section className={styles.section}>
            <h2>6. Contact</h2>
            <p>Questions about this policy? Contact us at <a href="mailto:privacy@ifykyk.app">privacy@ifykyk.app</a>.</p>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <Link to="/" className={styles.back}>← Back to ifykyk.app</Link>
        </div>
      </footer>
    </div>
  )
}
