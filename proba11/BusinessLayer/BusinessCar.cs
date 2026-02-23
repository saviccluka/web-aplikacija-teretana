using DataLayer;
using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class BusinessCar : IBusinessCar
    {
        private readonly ICarRepository carRepository;

        public BusinessCar(ICarRepository carRepository)
        {
            this.carRepository = carRepository;
        }

        public string Delete(Car car)
        {
            if (carRepository.Delete(car))
            {
                return "Automobil obrisan";
           }
            return "Greska";
        }

        public List<Car> GetCars()
        {
            var x = from item in carRepository.GetCars()
                    orderby item.Price descending select item;
            return x.ToList();
        }
    }
}
