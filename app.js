const products = [
 {id:"SP01",name:"Áo thun basic",cat:"Áo",price:189000,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP02",name:"Áo sơ mi trắng",cat:"Áo",price:329000,img:"https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP03",name:"Áo polo nam",cat:"Áo",price:279000,img:"https://images.unsplash.com/photo-1625910513413-5fc45c8b3d9c?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP04",name:"Quần jeans xanh",cat:"Quần",price:449000,img:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP05",name:"Quần kaki ống suông",cat:"Quần",price:399000,img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP06",name:"Quần short nữ",cat:"Quần",price:259000,img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP07",name:"Váy body đen",cat:"Váy",price:489000,img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP08",name:"Váy hoa nữ tính",cat:"Váy",price:459000,img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP09",name:"Chân váy chữ A",cat:"Váy",price:299000,img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP10",name:"Hoodie basic",cat:"Áo khoác",price:399000,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP11",name:"Áo khoác denim",cat:"Áo khoác",price:599000,img:"https://images.unsplash.com/photo-1523205565295-f8e0f1d5c2b0?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP12",name:"Áo cardigan",cat:"Áo khoác",price:429000,img:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP13",name:"Túi đeo vai",cat:"Túi",price:359000,img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP14",name:"Túi mini nữ",cat:"Túi",price:299000,img:"https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP15",name:"Túi tote canvas",cat:"Túi",price:219000,img:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP16",name:"Mũ lưỡi trai",cat:"Phụ kiện",price:159000,img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=500&q=80",new:true},
 {id:"SP17",name:"Kính thời trang",cat:"Phụ kiện",price:189000,img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",sale:true},
 {id:"SP18",name:"Thắt lưng da",cat:"Phụ kiện",price:249000,img:"https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=500&q=80",sale:true}
];

function money(n){return n.toLocaleString("vi-VN")+"đ";}

function renderProducts(list=products){
 const grid=document.getElementById("productGrid");
 if(!grid)return;
 grid.innerHTML=list.map((p,i)=>`
  <article class="product-card">
    <a href="${i===0 ? 'product.html?id='+p.id : '#'}" title="${i===0?'Xem chi tiết và đặt hàng':''}">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </a>
    <div class="product-name">${p.name}</div>
    <div class="product-info">Mã: ${p.id} · ${p.cat}</div>
    <div class="price">${p.sale?'<span class="old-price">'+money(p.price+80000)+'</span>':''}${money(p.price)}</div>
    ${p.new?'<span class="badge">HÀNG MỚI</span>':''}
    ${p.sale?'<span class="badge">KHUYẾN MÃI</span>':''}
  </article>
 `).join("");
}

function setupShop(){
 renderProducts();
 document.querySelectorAll("[data-filter]").forEach(a=>{
   a.addEventListener("click",e=>{
     e.preventDefault();
     const f=a.dataset.filter;
     renderProducts(f==="new"?products.filter(p=>p.new):f==="sale"?products.filter(p=>p.sale):products);
   });
 });
 document.querySelectorAll(".side-filter").forEach(btn=>{
   btn.addEventListener("click",()=>{
     const c=btn.dataset.cat;
     renderProducts(c==="all"?products:products.filter(p=>p.cat===c));
   });
 });
 const search=document.getElementById("searchInput");
 if(search)search.addEventListener("input",()=>{
   const q=search.value.toLowerCase().trim();
   renderProducts(products.filter(p=>(p.name+" "+p.id+" "+p.cat).toLowerCase().includes(q)));
 });
 const visits=document.getElementById("visits");
 if(visits){
   let n=Number(localStorage.getItem("fashionVisits")||0)+1;
   localStorage.setItem("fashionVisits",n);
   visits.textContent=n.toLocaleString("vi-VN");
 }
}

function setupForm(){
 const form=document.getElementById("productForm");
 if(!form)return;
 form.addEventListener("submit",e=>{
   e.preventDefault();
   const data=Object.fromEntries(new FormData(form));
   const old=JSON.parse(localStorage.getItem("savedProducts")||"[]");
   old.push(data);
   localStorage.setItem("savedProducts",JSON.stringify(old));
   document.getElementById("formMessage").textContent="✓ Đã lưu thông tin sản phẩm thành công!";
   form.reset();
 });
 form.addEventListener("reset",()=>{
   setTimeout(()=>document.getElementById("formMessage").textContent="",0);
 });
}
setupShop();
setupForm();
