
// ============ STORAGE MANAGEMENT ============
const Store = {
  getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [
      {id:1, name:"iPhone 15 Pro", price:18999000},
      {id:2, name:"Laptop Gaming", price:14500000},
      {id:3, name:"Kaos Oversize", price:189000},
      {id:4, name:"Kopi Arabica", price:65000}
    ];
  },
  saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  },
  getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [
      {id:1, code:"TRX001", customer:"Budi", total:500000},
      {id:2, code:"TRX002", customer:"Siti", total:1200000}
    ];
  },
  saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
};

// ============ NAVIGASI ============
function navigate(page){
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if(event && event.target) event.target.classList.add('active');
  if(window.innerWidth < 768) toggleSidebar(false);
}

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

// ============ LOGIN ============
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

// ============ PRODUK CRUD ============
function loadProducts(){
  const products = Store.getProducts();
  let html = "";
  products.forEach(item => {
    html += `
      <div class="product-card">
        <div class="product-info">
          <h3>${item.name}</h3>
          <p class="price">Rp ${item.price.toLocaleString('id-ID')}</p>
        </div>
        <div class="product-actions">
          <button class="btn-sm btn-edit" onclick="editProduct(${item.id})">✏️ Edit</button>
          <button class="btn-sm btn-delete" onclick="deleteProduct(${item.id})">🗑️ Hapus</button>
        </div>
      </div>
    `;
  });
  document.getElementById("product-grid").innerHTML = html;
}

function showProducts(){
  navigate('products');
  loadProducts();
}

function openAddProductForm(){
  document.getElementById('product-form-mode').value = 'add';
  document.getElementById('product-form').reset();
  document.getElementById('product-form-title').innerText = 'Tambah Produk Baru';
  document.getElementById('product-modal').style.display = 'block';
}

function closeProductModal(){
  document.getElementById('product-modal').style.display = 'none';
}

function saveProduct(){
  const mode = document.getElementById('product-form-mode').value;
  const name = document.getElementById('product-name').value.trim();
  const price = parseInt(document.getElementById('product-price').value);

  if(!name || !price || price <= 0){
    alert('Nama dan harga tidak boleh kosong!');
    return;
  }

  let products = Store.getProducts();
  
  if(mode === 'add'){
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({id: newId, name, price});
  }else{
    const id = parseInt(document.getElementById('product-form-mode').dataset.editId);
    const index = products.findIndex(p => p.id === id);
    if(index >= 0) products[index] = {id, name, price};
  }

  Store.saveProducts(products);
  closeProductModal();
  loadProducts();
  alert(mode === 'add' ? 'Produk ditambahkan!' : 'Produk diupdate!');
}

function editProduct(id){
  const products = Store.getProducts();
  const product = products.find(p => p.id === id);
  if(!product) return;

  document.getElementById('product-form-mode').value = 'edit';
  document.getElementById('product-form-mode').dataset.editId = id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-form-title').innerText = 'Edit Produk';
  document.getElementById('product-modal').style.display = 'block';
}

function deleteProduct(id){
  if(confirm('Yakin hapus produk ini?')){
    let products = Store.getProducts();
    products = products.filter(p => p.id !== id);
    Store.saveProducts(products);
    loadProducts();
    alert('Produk dihapus!');
  }
}

// ============ TRANSAKSI CRUD ============
function loadTransactions(){
  const transactions = Store.getTransactions();
  let html = "";
  transactions.forEach(item => {
    html += `
      <tr>
        <td>${item.code}</td>
        <td>${item.customer}</td>
        <td>Rp ${item.total.toLocaleString('id-ID')}</td>
        <td>
          <button class="btn-sm btn-edit" onclick="editTransaction(${item.id})">✏️</button>
          <button class="btn-sm btn-delete" onclick="deleteTransaction(${item.id})">🗑️</button>
        </td>
      </tr>
    `;
  });
  document.getElementById("trx-tbody").innerHTML = html;
}

function showTransactions(){
  navigate('transactions');
  loadTransactions();
}

function openAddTransactionForm(){
  document.getElementById('trx-form-mode').value = 'add';
  document.getElementById('trx-form').reset();
  document.getElementById('trx-form-title').innerText = 'Tambah Transaksi Baru';
  document.getElementById('trx-modal').style.display = 'block';
}

function closeTransactionModal(){
  document.getElementById('trx-modal').style.display = 'none';
}

function saveTransaction(){
  const mode = document.getElementById('trx-form-mode').value;
  const code = document.getElementById('trx-code').value.trim();
  const customer = document.getElementById('trx-customer').value.trim();
  const total = parseInt(document.getElementById('trx-total').value);

  if(!code || !customer || !total || total <= 0){
    alert('Semua field harus diisi dengan benar!');
    return;
  }

  let transactions = Store.getTransactions();
  
  if(mode === 'add'){
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    transactions.push({id: newId, code, customer, total});
  }else{
    const id = parseInt(document.getElementById('trx-form-mode').dataset.editId);
    const index = transactions.findIndex(t => t.id === id);
    if(index >= 0) transactions[index] = {id, code, customer, total};
  }

  Store.saveTransactions(transactions);
  closeTransactionModal();
  loadTransactions();
  alert(mode === 'add' ? 'Transaksi ditambahkan!' : 'Transaksi diupdate!');
}

function editTransaction(id){
  const transactions = Store.getTransactions();
  const transaction = transactions.find(t => t.id === id);
  if(!transaction) return;

  document.getElementById('trx-form-mode').value = 'edit';
  document.getElementById('trx-form-mode').dataset.editId = id;
  document.getElementById('trx-code').value = transaction.code;
  document.getElementById('trx-customer').value = transaction.customer;
  document.getElementById('trx-total').value = transaction.total;
  document.getElementById('trx-form-title').innerText = 'Edit Transaksi';
  document.getElementById('trx-modal').style.display = 'block';
}

function deleteTransaction(id){
  if(confirm('Yakin hapus transaksi ini?')){
    let transactions = Store.getTransactions();
    transactions = transactions.filter(t => t.id !== id);
    Store.saveTransactions(transactions);
    loadTransactions();
    alert('Transaksi dihapus!');
  }
}

// ============ MODAL CLOSE ============
window.onclick = function(event) {
  const productModal = document.getElementById('product-modal');
  const trxModal = document.getElementById('trx-modal');
  if(event.target === productModal) productModal.style.display = 'none';
  if(event.target === trxModal) trxModal.style.display = 'none';
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', function(){
  loadProducts();
  loadTransactions();
});
