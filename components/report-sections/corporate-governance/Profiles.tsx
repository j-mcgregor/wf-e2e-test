import { useTranslations } from 'next-intl';
import { Profile } from '../../../types/report';
import PersonalCard from './PersonalCard';

interface ProfilesProps {
  directors: Profile[];
  seniorManagement: Profile[];
}

const Profiles = ({ directors, seniorManagement }: ProfilesProps) => {
  const t = useTranslations();
  return (
    <div className="px-4 sm:px-0" data-testid="corp-senior-profiles-testid">
      <p className="my-4 text-xl">{t('directors')}</p>
      <div
        className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 print:block"
        data-testid="corp-directors-list-testid"
      >
        {directors.map((director, index) => (
          <PersonalCard
            key={director.name + index}
            title={director.title}
            name={director.name}
            role={director.role}
            linkedinProfile={director.linked_in_profile}
            profileImage={director.profile_image}
            appointmentDate={director.appointment_date}
            nationality={director.nationality}
            dateOfBirth={director.date_of_birth}
            otherAssociations={director.other_associations}
          />
        ))}
      </div>

      <p className="my-4 text-xl">{t('senior_management')}</p>
      <div
        className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 print:block"
        data-testid="corp-snr-mgmt-list-testid"
      >
        {seniorManagement.map((manager, index) => (
          <PersonalCard
            key={manager.name + index}
            title={manager.title}
            name={manager.name}
            role={manager.role}
            linkedinProfile={manager.linked_in_profile}
            profileImage={manager.profile_image}
            appointmentDate={manager.appointment_date}
            nationality={manager.nationality}
            dateOfBirth={manager.date_of_birth}
            otherAssociations={manager.other_associations}
          />
        ))}
      </div>
    </div>
  );
};

export default Profiles;
