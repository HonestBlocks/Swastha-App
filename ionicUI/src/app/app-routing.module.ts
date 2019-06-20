import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
    { path : '',redirectTo:'/landing',pathMatch:'full'},
    {path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  // { path: '', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  // { path: '', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  // { path: 'change-so-status', loadChildren: './manufacture/change-so-status/change-so-status.module#ChangeSoStatusPageModule' },
  // { path: 'create-product', loadChildren: './manufacture/create-product/create-product.module#CreateProductPageModule' },
  // { path: 'grn', loadChildren: './manufacture/grn/grn.module#GrnPageModule' },
  // { path: 'packaging', loadChildren: './manufacture/packaging/packaging.module#PackagingPageModule' },
  // { path: 'po', loadChildren: './manufacture/po/po.module#PoPageModule' },
  // { path: 'qc', loadChildren: './manufacture/qc/qc.module#QcPageModule' },
  // { path: 'view-po', loadChildren: './manufacture/view-po/view-po.module#ViewPoPageModule' },
  // { path: 'view-product', loadChildren: './manufacture/view-product/view-product.module#ViewProductPageModule' },
  // { path: 'view-single-po', loadChildren: './manufacture/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  // { path: 'view-single-product', loadChildren: './manufacture/view-single-product/view-single-product.module#ViewSingleProductPageModule' },
  // { path: 'view-single-so', loadChildren: './manufacture/view-single-so/view-single-so.module#ViewSingleSoPageModule' },
  { path: 'manufacture', loadChildren: './manufacture/manufacture.module#ManufacturePageModule' },
  // { path: 'so', loadChildren: './manufacture/so/so.module#SoPageModule' },
  // { path: '', loadChildren: './admin/admin.module#AdminPageModule' },
  // { path: 'add-regulator', loadChildren: './admin/add-regulator/add-regulator.module#AddRegulatorPageModule' },
  // { path: 'add-vendor', loadChildren: './admin/add-vendor/add-vendor.module#AddVendorPageModule' },
  // { path: 'view-regulator', loadChildren: './admin/view-regulator/view-regulator.module#ViewRegulatorPageModule' },
  // { path: 'view-single-vendor', loadChildren: './admin/view-single-vendor/view-single-vendor.module#ViewSingleVendorPageModule' },
  // { path: 'view-vendor', loadChildren: './admin/view-vendor/view-vendor.module#ViewVendorPageModule' },
  // { path: 'login', loadChildren: './admin/login/login.module#LoginPageModule' },
  // { path: 'vendor', loadChildren: './vendor/vendor.module#VendorPageModule' },
  // { path: 'change-po-status', loadChildren: './vendor/change-po-status/change-po-status.module#ChangePoStatusPageModule' },
  // { path: 'index', loadChildren: './vendor/index/index.module#IndexPageModule' },
  // { path: 'view-po', loadChildren: './vendor/view-po/view-po.module#ViewPoPageModule' },
  // { path: 'view-single-po', loadChildren: './vendor/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  // { path: 'view-single-so', loadChildren: './vendor/view-single-so/view-single-so.module#ViewSingleSoPageModule' },
  // { path: 'retailer', loadChildren: './retailer/retailer.module#RetailerPageModule' },
  // { path: 'grn', loadChildren: './retailer/grn/grn.module#GrnPageModule' },
  // { path: 'po', loadChildren: './retailer/po/po.module#PoPageModule' },
  // { path: 'sales-product', loadChildren: './retailer/sales-product/sales-product.module#SalesProductPageModule' },
  // { path: 'so', loadChildren: './retailer/so/so.module#SoPageModule' },
  // { path: 'view-po', loadChildren: './retailer/view-po/view-po.module#ViewPoPageModule' },
  // { path: 'view-single-po', loadChildren: './retailer/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  // { path: 'view-single-product', loadChildren: './retailer/view-single-product/view-single-product.module#ViewSingleProductPageModule' },
  // { path: 'view-single-so', loadChildren: './retailer/view-single-so/view-single-so.module#ViewSingleSoPageModule' },
  // { path: 'regulator', loadChildren: './regulator/regulator.module#RegulatorPageModule' },
  // { path: 'distributor', loadChildren: './distributor/distributor.module#DistributorPageModule' },
  // { path: 'change-so-status', loadChildren: './distributor/change-so-status/change-so-status.module#ChangeSoStatusPageModule' },
  // { path: 'grn', loadChildren: './distributor/grn/grn.module#GrnPageModule' },
  // { path: 'packaging', loadChildren: './distributor/packaging/packaging.module#PackagingPageModule' },
  // { path: 'po', loadChildren: './distributor/po/po.module#PoPageModule' },
  // { path: 'so', loadChildren: './distributor/so/so.module#SoPageModule' },
  // { path: 'view-po', loadChildren: './distributor/view-po/view-po.module#ViewPoPageModule' },
  // { path: 'view-single-po', loadChildren: './distributor/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  // { path: 'view-single-so', loadChildren: './distributor/view-single-so/view-single-so.module#ViewSingleSoPageModule' },
  // { path: 'main', loadChildren: './regulator/main/main.module#MainPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}