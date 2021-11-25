import { Profile } from '../../../types/report';
import PersonalCard from './PersonalCard';
import { useTranslations } from 'next-intl';

interface ProfilesProps {
  directors: Profile[];
  seniorManagement: Profile[];
}

const Profiles = ({ directors, seniorManagement }: ProfilesProps) => {
  const t = useTranslations();

  // directors section 1st group always 4, consequent groups up to 6
  const directorsSection: Profile[][] =
    directors &&
    directors.reduce((acc: any, curr: any, index) => {
      if (index === 4 && index - 4 >= 0) {
        acc.push(directors.slice(index - 4, index));
      }
      if (index % 6 === 0) {
        acc.push([curr]);
      } else {
        acc[acc.length - 1].push(curr);
      }
      return acc;
    }, []);

  // senior management section always in groups of 6
  const seniorManagementSection: Profile[][] =
    seniorManagement &&
    seniorManagement.reduce(
      (acc: any, curr: any, index) =>
        (index % 6 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
        acc,
      []
    );

  return (
    <div className="px-4 sm:px-0" data-testid="corp-senior-profiles-testid">
      {directorsSection && (
        <div className="avoid-break">
          <p className="my-4 text-xl print:text-2xl print:py-10">
            {t('directors')}
          </p>
          <div className="" data-testid="corp-directors-list-testid">
            {directorsSection.map((section, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 2xl:grid-cols-3 gap-2 avoid-break my-2 ${
                  index !== 0 && 'print:pt-24'
                }`}
              >
                {section.map((director, index) => (
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
            ))}
          </div>
        </div>
      )}

      {seniorManagementSection && (
        <div className="avoid-break print:pt-16 always-break-before">
          <p className="my-4 text-xl print:text-2xl">
            {t('senior_management')}
          </p>
          <div className="" data-testid="corp-snr-mgmt-list-testid">
            {seniorManagementSection.map((section, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 2xl:grid-cols-3 gap-2 avoid-break my-2 ${
                  index !== 0 && 'print:pt-24'
                }`}
              >
                {section.map((manager, index) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profiles;
