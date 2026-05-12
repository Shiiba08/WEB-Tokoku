
// Navigasi antar halaman
function navigate(page){
  document.querySelectorAll('.page').forEach(el=>{
    el.classList.remove('active');
  });
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(el=>{
    el.classList.remove('active');
  });
  if(event && event.target) {
    event.target.classList.add('active');
  }
  if(window.innerWidth < 768){
    toggleSidebar(false);
  }
}

// Sidebar Mobile
function toggleSidebar(open){
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');
  if(open){
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }else{
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }
}

// Login
function doLogin(){
  let user = document.getElementById('login-user').value;
  let pass = document.getElementById('login-pass').value;
  if(user === "admin" && pass === "admin123"){
    alert("Login berhasil!");
    document.getElementById("sidebar-username").innerText = "Admin";
    document.getElementById("sidebar-role").innerText = "Administrator";
    navigate('home');
  }else{
    alert("Username / Password salah!");
  }
}

// Data Produk
const products = [
  {name:"iPhone 15 Pro", price:"Rp 18.999.000"},
  {name:"Laptop Gaming", price:"Rp 14.500.000"},
  {name:"Kaos Oversize", price:"Rp 189.000"},
  {name:"Kopi Arabica", price:"Rp 65.000"}
];

// Load Produk
function loadProducts(){
  let html = "";
  products.forEach(item=>{
    html += `<div class="product-card"><h3>${item.name}</h3><p>${item.price}</p></div>`;
  });
  document.getElementById("product-grid").innerHTML = html;
}

// Data Transaksi
const trx = [
  {id:"TRX001", customer:"Budi", total:"Rp 500.000"},
  {id:"TRX002", customer:"Siti", total:"Rp 1.200.000"}
];

// Load Transaksi
function loadTransactions(){
  let html = "";
  trx.forEach(item=>{
    html += `<tr><td>${item.id}</td><td>${item.customer}</td><td>${item.total}</td></tr>`;
  });
  document.getElementById("trx-tbody").innerHTML = html;
}

// Tampilkan Produk
function showProducts(){
  navigate('products');
  loadProducts();
}

// Tampilkan Transaksi
function showTransactions(){
  navigate('transactions');
  loadTransactions();
}
