using Catalog_Online.Helper;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using System.Collections.Generic;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class MarkServiceImpl : IMarkService
    {
        RepositoryContext _context;

        public MarkServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        public Mark AddMark(Mark mark)
        {
            var newMark = _context.Marks.Add(mark);
            _context.SaveChanges();

            return newMark.Entity;
        }

        public List<Mark> GetMarksByUserId(int id)
        {
            return _context.Marks.Where(m => m.UserId == id).ToList();
        }
    }
}
