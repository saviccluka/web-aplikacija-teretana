using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public interface ICarRepository
    {
        List<Car> GetCars();
        bool Delete(Car car);
    }
}
