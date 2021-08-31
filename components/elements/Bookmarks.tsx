import BookmarkCard from '../cards/BookmarkCard';
import { Report } from '../../types/global';

interface BookmarkProps {
  reports?: Report[] | null;
  qty: number; // limit number of bookmarks to show
}

const Bookmarks = ({ reports, qty }: BookmarkProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {reports?.map((report, index) => {
        if (index < qty) {
          return (
            <BookmarkCard
              key={report.id}
              linkTo="#"
              company_name={report.company_Name}
              sme_zscore={report.sme_zscore}
              bond_rating={report.bond_rating}
              pd_ratio={12} // not currently in mock data
            />
          );
        }
      })}
    </div>
  );
};

export default Bookmarks;
