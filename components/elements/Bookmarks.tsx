import BookmarkCard from '../cards/BookmarkCard';
import { Report } from '../../types/global';

interface BookmarkProps {
  reports?: Report[] | null;
}

const Bookmarks = ({ reports }: BookmarkProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 first: gap-2">
      {reports?.map(report => {
        return (
          <BookmarkCard
            key={report.id}
            linkTo="#"
            company_name={report.company_Name}
            sme_zscore={report.sme_zscore}
            bond_rating={report.bond_rating}
            pd_ratio={12}
          />
        );
      })}
    </div>
  );
};

export default Bookmarks;
