import SettingsForm from "@/components/shared/settings/SettingsForm";
import Title from "@/components/shared/ui/Title";

export default async function Page() {
  const data = {
    firstName: "Mohamed",
    lastName: "Ramy",
    role: "IT",
    email: "mohamed@nagda.com"
  }

  return (
    <div className="p-8 max-w-4xl ">
      <Title title="Profile Settings" 
            description="Manage your account details and preferences." 
        />
        <SettingsForm initialData={data} />
    </div>
  );
}