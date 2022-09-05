const loadPhone = async(product) =>
   {
      const url = `https://openapi.programming-hero.com/api/phones?search=${product}`;
      const res = await fetch(url);
      const data = await res.json();
      displayPhones(data.data);
   }
const phoneContainer = document.getElementById('Phone-Container');
const NoProduct = document.getElementById('not-found');
const displayPhones = phones =>
   {
      // phones = phones.slice(0,20);
      
      // When product not found
      if(phones.length === 0)
         {
            NoProduct.classList.remove('d-none');
         }
      else
         {
            NoProduct.classList.add('d-none');
         }

      // Run a loop
      phones.forEach(phone => 
         {
            const phonediv = document.createElement('div');
            phonediv.classList.add('col')
            phonediv.innerHTML =
               `
                  <div class="card p-3" style="height: 500px;">
                     <div class="d-flex justify-content-center">
                        <img src="${phone.image}" class="card-img-top" alt="" style="width:max-content;">
                     </div>
                     <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button onclick = "PhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" style = "width: 100%" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                     </div>
                  </div>

               `;
            phoneContainer.appendChild(phonediv);
            console.log(phone.slug);

         });
      // stop lodder
      lodder(false);
   }


document.getElementById('Seach-button').addEventListener('click',function()
   {
      // Start lodder
      lodder(true);
      phoneContainer.textContent = '';
      const InputFild = document.getElementById('Input-field');
      const SeachValue = InputFild.value;
      loadPhone(SeachValue);
   })
document.getElementById('Input-field').addEventListener('keypress',function(e)
   {
      if(e.key === 'Enter')
         {
            // Start lodder
            lodder(true);
            phoneContainer.textContent = '';
            const InputFild = document.getElementById('Input-field');
            const SeachValue = InputFild.value;
            loadPhone(SeachValue);
         }
   });


const lodder = islodding =>
   {
      const lodderFild = document.getElementById('Spinner');
      
      if(islodding)
         {
            lodderFild.classList.remove('d-none');
         }
      else
         {
            lodderFild.classList.add('d-none');
         }
   }

const PhoneDetails = async(id) =>
   {
      const url = `https://openapi.programming-hero.com/api/phone/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      DisplayPhoneDetails(data.data);
      
   }
const DisplayPhoneDetails = phone =>
   {
      console.log(phone)
      const modal = document.getElementById('phone-details');
      modal.innerText = phone.name;
      const phoneAbout = document.getElementById('About');
      phoneAbout.innerHTML =
         `
            <p>Release Date: ${phone.releaseDate? phone.releaseDate: 'No Release Date found.'}</p>
            <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
            <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
            <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
         `;
   }
loadPhone('samsung');
loadPhone('apple');
loadPhone('oppo');
loadPhone('Nova');