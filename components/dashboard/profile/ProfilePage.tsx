import CardWrapper from "../CardWrapper";
import { EmailForm } from "./EmailForm";
import { PasswordForm } from "./PasswordForm";
import { ProfileDetailsForm } from "./ProfileDetailsForm";

export default function ProfilePage({ user }: { user: any }) {
  return (
    <CardWrapper title="Profile">
      <div className="p-2 space-y-4">
        <ProfileDetailsForm user={user} />
        <EmailForm currentEmail={user.email} />
        <PasswordForm />
      </div>
    </CardWrapper>
  );
}
