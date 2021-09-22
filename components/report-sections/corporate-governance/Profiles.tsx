import { useTranslations } from 'use-intl';
import { Profile } from '../../../types/report';
import PersonalCard from './PersonalCard';

interface ProfilesProps {
  directors: Profile[];
  seniorManagement: Profile[];
}

const Profiles = ({ directors, seniorManagement }: ProfilesProps) => {
  const t = useTranslations();
  return (
    <div className="px-4 sm:px-0">
      <p className="my-4 text-xl">{t('directors')}</p>
      <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between">
        {directors.map(director => (
          <PersonalCard
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

      <p className="my-4 text-xl">{t('senior management')}</p>
      <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between">
        {seniorManagement.map(manager => (
          <PersonalCard
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
