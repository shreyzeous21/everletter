import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <section className="py-10">
      <div className="mx-auto container px-4">
        <div className="space-y-8">
          <div>
            <h1 className="mb-4 text-4xl font-semibold lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="mb-3 text-xl font-semibold">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Newsletter ("we," "our," or "us"). We are committed
                to protecting your privacy and ensuring you have a positive
                experience on our website and in using our services. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website and use
                our newsletter platform.
              </p>
              <p className="text-muted-foreground">
                By using our service, you agree to the collection and use of
                information in accordance with this policy. If you do not agree
                with our policies and practices, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                2. Information We Collect
              </h2>
              <h3 className="mb-2 text-lg font-medium">
                2.1 Information You Provide
              </h3>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  password (hashed), and profile image when you create an
                  account
                </li>
                <li>
                  <strong>Contact Information:</strong> Name, email address,
                  country, and message when you use our contact form
                </li>
                <li>
                  <strong>Payment Information:</strong> Payment details
                  processed through our third-party payment processor (Razorpay)
                  for subscription services
                </li>
                <li>
                  <strong>Newsletter Content:</strong> Content, templates, and
                  campaign data you create using our platform
                </li>
              </ul>

              <h3 className="mb-2 mt-4 text-lg font-medium">
                2.2 Automatically Collected Information
              </h3>
              <p className="text-muted-foreground">
                When you access our service, we automatically collect certain
                information, including:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Usage Data:</strong> Information about how you
                  interact with our service, including pages visited, features
                  used, and time spent
                </li>
                <li>
                  <strong>Device Information:</strong> IP address, browser type,
                  device type, operating system, and device identifiers
                </li>
                <li>
                  <strong>Session Information:</strong> Session tokens, login
                  times, and user agent information for security purposes
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> We use
                  cookies and similar tracking technologies to track activity on
                  our service
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect for various purposes,
                including:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>To provide, maintain, and improve our services</li>
                <li>
                  To process your account registration and manage your account
                </li>
                <li>To process payments and manage subscriptions</li>
                <li>
                  To send you newsletters and email campaigns on your behalf
                </li>
                <li>
                  To communicate with you about your account, service updates,
                  and customer support
                </li>
                <li>
                  To respond to your inquiries and provide customer support
                </li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>
                  To detect, prevent, and address technical issues and security
                  threats
                </li>
                <li>To comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                4. Data Storage and Security
              </h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet or
                electronic storage is 100% secure.
              </p>
              <p className="text-muted-foreground">
                Your data is stored on secure servers and databases. We use
                industry-standard encryption for data in transit and at rest.
                Passwords are hashed using secure algorithms and are never
                stored in plain text.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                5. Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share your
                information only in the following circumstances:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> With third-party service
                  providers who perform services on our behalf, such as payment
                  processing (Razorpay), email delivery, and hosting services
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law,
                  court order, or government regulation
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with any
                  merger, sale of assets, or acquisition of all or a portion of
                  our business
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you have given us
                  explicit consent to share your information
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                6. Your Rights and Choices
              </h2>
              <p className="text-muted-foreground">
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data
                  in a portable format
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing
                  communications
                </li>
                <li>
                  <strong>Account Deletion:</strong> Delete your account and
                  associated data through your account settings
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:shrey.sadhukhan21@gmail.com"
                  className="text-primary hover:underline"
                >
                  shrey.sadhukhan21@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">7. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your
                experience. Cookies are small data files stored on your device.
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                8. Third-Party Services
              </h2>
              <p className="text-muted-foreground">
                Our service may contain links to third-party websites or
                integrate with third-party services. We are not responsible for
                the privacy practices of these third parties. We encourage you
                to review their privacy policies.
              </p>
              <p className="text-muted-foreground">
                We use the following third-party services:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Razorpay:</strong> For payment processing. Their
                  privacy policy governs how they handle payment information.
                </li>
                <li>
                  <strong>Email Service Providers:</strong> For sending
                  newsletters and transactional emails
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">9. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required or
                permitted by law. When you delete your account, we will delete
                or anonymize your personal information, except where we are
                required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                10. Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                Our service is not intended for children under the age of 18. We
                do not knowingly collect personal information from children
                under 18. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us
                immediately.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                11. International Data Transfers
              </h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and maintained on
                computers located outside of your state, province, country, or
                other governmental jurisdiction where data protection laws may
                differ. By using our service, you consent to the transfer of
                your information to our facilities and those third parties with
                whom we share it as described in this policy.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">13. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:shrey.sadhukhan21@gmail.com"
                    className="text-primary hover:underline"
                  >
                    shrey.sadhukhan21@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> +91 8477081261
                </p>
              </div>
            </section>
          </div>

          <div className="pt-8 border-t">
            <Link href="/" className="text-sm text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
