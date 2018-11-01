const cars = [
    {brand:'Hyundai', model:'Sonata', year:'2000',type:'Sedan'},
    {brand:'Hyundai', model:'Azera', year:'1982',type:'Sedan'},
    {brand:'BMW', model:'M3', year:'2015',type:'Coupe'},
    {brand:'Toyota', model:'camry', year:'2017',type:'Sedan'},
    {brand:'Hyundai', model:'Genesis', year:'2011',type:'Coupe'},
    {brand:'Toyota', model:'Highlander', year:'1970',type:'SUV'},
    {brand:'Honda', model:'Accord', year:'2018',type:'Sedan'},
    {brand:'Honda', model:'Pilot', year:'2015',type:'SUV'},
    {brand:'Nissan', model:'Pathfinder', year:'1999',type:'SUV'},
    {brand:'Nissan', model:'Maxima', year:'2016',type:'Sedan'}
  ];
  
//   const tempArr = ['one','two','three','four','five'];
  
  
//   let str = 'hello';
//   str = 'hello there';
//   let num = 1;
//   num = 5;
//   let obj = {
//     a: 'hi',
//     b: 'hola',
//     c: 'bonjour'
//   };
  
//   tempArr[1] = 2;
//   tempArr[5] = 6;
//   tempArr[7] = 7;
//   tempArr.push(8);
//   tempArr.splice(6, 1);
  
//   console.log(str);
//   console.log(tempArr);
  
  // let arr = [1, 2, 3, 4, 5]
  // console.log(arr)
  // arr.push(6)
  // console.log(arr)
  // arr[1] = 10;
  // console.log(arr)
  
  
  
  
  
  
  
  //  **  console.log all answers below
  
  // 1. console.log all the brand names contained in the cars array
  cars.forEach(car => {
      console.log(car.brand);
  });

  // 2. filter all cars that were built after year 2000

    cars.forEach(car => {
        if (car.year > 2000) {
            console.log(car.year);
        };
    });
  
  // 3. count the number of cars that were built on or before year 2000 (hint:  reduce)
  let totalCars = [];
    cars.forEach(car => {
        if (car.year <= 2000) {
            totalCars.push(car);
        };
    });
    console.log(totalCars.length);
  
  // 4. Grab just 'model' and 'year' of the cars that were built after year 2000 and save into a new array
  //    example result is below.
  //    newArr=[
  //      {model:'Pilot', year:'2015'},
  //       {model:'Genesis', year:'2011'},
  //       {model:'Maxima', year:'2016'}
  //    ]
  let newArr = null;

  let modernModel = [];

  cars.forEach(car => {
      if (car.year > 2000) {
          modernModel.push(car);
      };
  });

 
  
  console.log(modernModel);
  
  
  
  //  5. sort the cars array by model name in ascending order
  //     hint:  make case insensitive.  4th item "camry" has lower case.  Make sure the sort results in correct ascending order ignoring the case.