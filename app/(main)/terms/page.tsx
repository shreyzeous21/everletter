import Link from "next/link";

export default function TermsOfService() {
  return (
    <section className="py-10">
      <div className="mx-auto container px-4">
        <div className="space-y-8">
          <div>
            <h1 className="mb-4 text-4xl font-semibold lg:text-5xl">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="mb-3 text-xl font-semibold">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Newsletter ("the Service"), you agree to be
                bound by these Terms of Service ("Terms"). If you disagree with
                any part of these terms, then you may not access the Service.
                These Terms apply to all visitors, users, and others who access
                or use the Service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">2. Description of Service</h2>
              <p className="text-muted-foreground">
                Newsletter is a platform that enables users to create, design,
                send, and track email newsletters and marketing campaigns. Our
                Service includes:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Email newsletter creation and design tools</li>
                <li>Email campaign management and scheduling</li>
                <li>Subscriber list management</li>
                <li>Analytics and performance tracking</li>
                <li>Email template library</li>
                <li>Subscription and payment processing</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">3. User Accounts</h2>
              <h3 className="mb-2 text-lg font-medium">3.1 Account Registration</h3>
              <p className="text-muted-foreground">
                To use certain features of our Service, you must register for an
                account. You agree to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="mb-2 mt-4 text-lg font-medium">3.2 Account Eligibility</h3>
              <p className="text-muted-foreground">
                You must be at least 18 years old to create an account. By
                creating an account, you represent and warrant that you are of
                legal age to form a binding contract and meet all eligibility
                requirements.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">4. Acceptable Use</h2>
              <p className="text-muted-foreground">
                You agree not to use the Service to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others, including intellectual property rights</li>
                <li>Send spam, unsolicited emails, or engage in email abuse</li>
                <li>Transmit any malicious code, viruses, or harmful content</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Collect or harvest information about other users without consent</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Send emails to recipients who have not opted in or consented</li>
                <li>Violate any anti-spam laws, including CAN-SPAM Act, GDPR, or CASL</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">5. Subscription Plans and Payments</h2>
              <h3 className="mb-2 text-lg font-medium">5.1 Subscription Plans</h3>
              <p className="text-muted-foreground">
                We offer various subscription plans, including a Free plan and
                paid Pro plan. Subscription features, pricing, and terms are
                subject to change with notice.
              </p>

              <h3 className="mb-2 mt-4 text-lg font-medium">5.2 Payment Terms</h3>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Payments are processed through our third-party payment processor (Razorpay)</li>
                <li>Subscription fees are charged in advance on a recurring basis</li>
                <li>All fees are non-refundable except as required by law or as stated in these Terms</li>
                <li>You are responsible for all applicable taxes</li>
                <li>We reserve the right to change our pricing with 30 days' notice</li>
              </ul>

              <h3 className="mb-2 mt-4 text-lg font-medium">5.3 Free Trial</h3>
              <p className="text-muted-foreground">
                We may offer a free trial period. If you cancel during the trial
                period, you will not be charged. If you do not cancel before the
                trial ends, you will be charged according to your selected plan.
              </p>

              <h3 className="mb-2 mt-4 text-lg font-medium">5.4 Cancellation and Refunds</h3>
              <p className="text-muted-foreground">
                You may cancel your subscription at any time through your
                account settings. Cancellation takes effect at the end of your
                current billing period. You will continue to have access to paid
                features until the end of your billing period. Refunds are
                provided only as required by law or at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">6. Content and Intellectual Property</h2>
              <h3 className="mb-2 text-lg font-medium">6.1 Your Content</h3>
              <p className="text-muted-foreground">
                You retain ownership of all content you create, upload, or
                transmit through the Service ("Your Content"). By using the
                Service, you grant us a worldwide, non-exclusive, royalty-free
                license to use, store, and process Your Content solely to
                provide and improve the Service.
              </p>

              <h3 className="mb-2 mt-4 text-lg font-medium">6.2 Our Content</h3>
              <p className="text-muted-foreground">
                The Service, including its original content, features, and
                functionality, is owned by Newsletter and is protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws. You may not copy, modify,
                distribute, sell, or lease any part of our Service.
              </p>

              <h3 className="mb-2 mt-4 text-lg font-medium">6.3 Content Responsibility</h3>
              <p className="text-muted-foreground">
                You are solely responsible for Your Content and the consequences
                of posting or publishing it. We do not endorse or assume
                responsibility for any content submitted by users.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">7. Email Compliance</h2>
              <p className="text-muted-foreground">
                You are responsible for ensuring that all emails sent through
                our Service comply with applicable laws and regulations,
                including:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>CAN-SPAM Act (United States)</li>
                <li>GDPR (European Union)</li>
                <li>CASL (Canada)</li>
                <li>Other applicable anti-spam and data protection laws</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                You must obtain proper consent from recipients before sending
                emails, include unsubscribe links in all marketing emails, and
                honor unsubscribe requests promptly. We reserve the right to
                suspend or terminate accounts that violate email compliance
                requirements.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">8. Service Availability</h2>
              <p className="text-muted-foreground">
                We strive to maintain high availability of our Service but do
                not guarantee uninterrupted access. The Service may be
                unavailable due to maintenance, updates, technical issues, or
                circumstances beyond our control. We are not liable for any
                damages resulting from Service unavailability.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">9. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account and access to the
                Service immediately, without prior notice, for any reason,
                including if you breach these Terms. Upon termination:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Your right to use the Service will immediately cease</li>
                <li>We may delete your account and content</li>
                <li>You remain liable for all charges incurred up to the termination date</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                You may terminate your account at any time by contacting us or
                through your account settings.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">10. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING,
                BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT
                WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR
                ERROR-FREE.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">11. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL
                NEWSLETTER, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS,
                DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR
                RELATING TO YOUR USE OF THE SERVICE, REGARDLESS OF THE THEORY
                OF LIABILITY.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless Newsletter and
                its affiliates from any claims, damages, losses, liabilities, and
                expenses (including legal fees) arising out of or relating to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Your use of the Service</li>
                <li>Your Content</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your violation of any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with
                the laws of India, without regard to its conflict of law
                provisions. Any disputes arising from these Terms or the Service
                shall be subject to the exclusive jurisdiction of the courts in
                India.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">14. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will
                notify you of any material changes by posting the new Terms on
                this page and updating the "Last updated" date. Your continued
                use of the Service after such changes constitutes acceptance of
                the new Terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">15. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be unenforceable or
                invalid, that provision shall be limited or eliminated to the
                minimum extent necessary, and the remaining provisions shall
                remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">16. Entire Agreement</h2>
              <p className="text-muted-foreground">
                These Terms, together with our Privacy Policy, constitute the
                entire agreement between you and Newsletter regarding the use of
                the Service and supersede all prior agreements and
                understandings.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">17. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please
                contact us:
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
            <Link
              href="/"
              className="text-sm text-primary hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

