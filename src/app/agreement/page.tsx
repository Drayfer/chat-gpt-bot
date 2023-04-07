import Link from "next/link";
import Footer from "../login/Footer";

export default function Login() {
  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4">
      <div className="mb-10 text-xl">
        <Link href="/login" className="font-extrabold underline">
          Back
        </Link>{" "}
        / Offer Agreement
      </div>
      <h1 className="text-3xl mb-6 font-bold">
        Offer Agreement for GPT AI Chat Bot Application
      </h1>

      <p className="mb-6">
        This Offer Agreement (hereinafter referred to as the “Agreement“) is an
        official offer of GPT AI Chat Bot, a company incorporated under the laws
        of the United States, (hereinafter referred to as “GPT AI Chat Bot“) to
        individuals who wish to use the GPT AI Chat Bot mobile application
        (hereinafter referred to as the “Application“).
      </p>

      <h2 className="text-2xl mb-6 font-bold">1. Subject of the Agreement</h2>
      <p className="mb-6">
        1.1. GPT AI Chat Bot offers the User to use the Application in
        accordance with the terms of this Agreement.
      </p>

      <h2 className="text-2xl mb-6 font-bold">2. User registration</h2>
      <p className="mb-6">
        2.1. To use the Application, the User must complete the registration
        process by providing accurate and complete information.
      </p>
      <p className="mb-6">
        2.2. The User agrees to provide truthful and accurate information during
        the registration process and to update such information as necessary.
      </p>
      <p className="mb-6">
        2.3. GPT AI Chat Bot has the right to suspend or terminate the
        User&apos;s account if the User provides false or inaccurate
        information.
      </p>

      <h2 className="text-2xl mb-6 font-bold">
        3. Rights and obligations of the parties
      </h2>
      <p className="mb-6">
        3.1. GPT AI Chat Bot grants the User the right to use the Application
        for personal, non-commercial purposes in accordance with the terms of
        this Agreement.
      </p>
      <p className="mb-6">
        3.2. The User agrees to use the Application solely for its intended
        purpose and not for any illegal or unauthorized purpose.
      </p>
      <p className="mb-6">
        3.3. The User is responsible for maintaining the confidentiality of
        their login information.
      </p>
      <p className="mb-6">
        3.4. GPT AI Chat Bot has the right to modify, suspend, or terminate the
        Application at any time and for any reason without notice to the User.
      </p>
      <p className="mb-6">
        3.5. The User has the right to terminate this Agreement at any time by
        deleting the Application from their mobile device.
      </p>

      <h2 className="text-2xl mb-6 font-bold">
        4. Intellectual property rights
      </h2>
      <p className="mb-6">
        4.1. All intellectual property rights to the Application, including but
        not limited to copyright, trademark, and trade secret rights, are owned
        by GPT AI Chat Bot.
      </p>
      <p className="mb-6">
        4.2. The User acknowledges that they do not acquire any ownership rights
        to the Application or its content.
      </p>

      <h2 className="text-2xl mb-6 font-bold">5. Limitation of liability</h2>
      <p className="mb-6">
        5.1. GPT AI Chat Bot is not responsible for any damages, including but
        not limited to direct, indirect, incidental, or consequential damages,
        arising out of or in connection with the use or inability to use the
        Application.
      </p>
      <p className="mb-6">
        5.2. GPT AI Chat Bot is not responsible for the content created by the
        User using the Application.
      </p>
      <p className="mb-6">
        5.3. The User agrees to indemnify and hold GPT AI Chat Bot harmless from
        any claims, damages, or losses arising out of or in connection with the
        User&apos;s use of the Application.
      </p>

      <h2 className="text-2xl mb-6 font-bold">6. Privacy policy</h2>
      <p className="mb-6">
        6.1. GPT AI Chat Bot collects and processes the User&apos;s personal
        information in accordance with its Privacy Policy, which is available on
        the GPT AI Chat Bot website.
      </p>
      <p className="mb-6">
        6.2. The User agrees that GPT AI Chat Bot may collect, use, and disclose
        their personal information in accordance with the Privacy Policy.
      </p>

      <h2 className="text-2xl mb-6 font-bold">
        7. Governing law and dispute resolution
      </h2>
      <p className="mb-6">
        7.1. This Agreement shall be governed by and construed in accordance
        with the laws of the United States.
      </p>
      <p className="mb-6">
        7.2. Any dispute arising out of or in connection with this Agreement
        shall be resolved by arbitration in accordance with the rules of the
        American Arbitration Association.
      </p>

      <h2 className="text-2xl mb-6 font-bold">8. Miscellaneous</h2>
      <p className="mb-6">
        8.1. This Agreement constitutes the entire agreement between the parties
        and supersedes all prior agreements and understandings, whether written
        or oral, relating to the subject matter of this Agreement.
      </p>
      <p className="mb-6">
        8.2. GPT AI Chat Bot has the right to assign this Agreement to a third
        party without the User&apos;s consent.
      </p>
      <p className="mb-6">
        8.3. If any provision of this Agreement is found to be invalid or
        unenforceable, the remaining provisions shall remain in full force and
        effect.
      </p>
      <Footer />
    </div>
  );
}
