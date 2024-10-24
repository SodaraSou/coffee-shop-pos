<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ route('home') }}" class="brand-link">
        <img src="{{ asset('vendor/adminlte/dist/img/AdminLTELogo.png') }}" alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">AdminLTE</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false" id="sidebar">
                <li class="nav-item">
                    <a href="{{ route('home') }}" class="nav-link" id="dashboard">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Dashboard
                        </p>
                    </a>
                </li>
                <li class="nav-item" id="product">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa fa-box"></i>
                        <p>
                            Products
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link" id="product-index">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Products List</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" id="product-create">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Create Product</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item" id="purchase">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa fa-shopping-cart"></i>
                        <p>
                            Purchases
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ route('purchase.index') }}" class="nav-link" id="purchase-index">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Purchases List</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('purchase.create') }}" class="nav-link" id="purchase-create">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Create Purchases</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item" id="ingredient">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa fa-cubes"></i>
                        <p>
                            Ingredients
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link" id="ingredient-index">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Ingredients List</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" id="ingredient-create">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Create ingredient</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item" id="invoice">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa fa-file-invoice-dollar"></i>
                        <p>
                            Invoices
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ route('invoice.index') }}" class="nav-link" id="invoice-index">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Invoices List</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item" id="receipt">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa fa-receipt"></i>
                        <p>
                            Receipts
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link" id="receipt-index">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Receipts List</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link" id="receipt-index">
                                <i class="fas fa-angle-double-right nav-icon"></i>
                                <p>Create Receipt</p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>
