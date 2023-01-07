using Catalog_Online.Models.Entity;
using System.Collections.Generic;

namespace Catalog_Online.Services
{
    public interface IMarkService
    {
        public Mark AddMark(Mark mark);

        public List<Mark> GetMarksByUserId(int id);
    }
}
