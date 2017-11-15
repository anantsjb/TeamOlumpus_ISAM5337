import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../Service/User/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cart } from '../../Model/Cart/cart';
import { IUser } from '../../Model/User/user';
import { DBOperation, Roles } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { AuthGuard } from '../../Components/Login/Guard/auth.guard';

@Component({
    templateUrl: 'app/Components/Cart/cart.component.html'
})

export class CartComponent implements OnInit {
    constTax: number = 0.08;
    shipping: number = 0.01;
    cartList: Cart[];
    allCartItems: Cart[];
    cart: Cart;
    subTotalPrice: number = 0;
    loggedInUserDetails: IUser = this.authGuard.getUserAndUrlDetail();
   

    constructor(private _userService: UserService, private authGuard: AuthGuard, private router: Router) { }

    ngOnInit(): void {
      
        this.allCartItems =  JSON.parse(localStorage.getItem('cartItems'));
        if (this.allCartItems && this.allCartItems.filter(o => o.UserId == this.loggedInUserDetails.Id))
        {
            this.cartList = this.allCartItems.filter(o => o.UserId == this.loggedInUserDetails.Id);
            this.calculateTotalCost(this.cartList);
        }
            
        
    }
    quantityChanged(item: Cart, event: any): void {
        var val = event.target.value;
        if (Number.isNaN(val) || val <= 0)
            event.target.value = 1;
       
        for (var i = 0; i < this.allCartItems.length; i++) {
            if ((this.allCartItems[i].ProductID == item.ProductID) && (this.allCartItems[i].UserId == item.UserId)) {
                this.allCartItems[i].Quantity = parseInt(event.target.value);
                //break;
            }
        }
        this.cartList = this.allCartItems.filter(o => o.UserId == this.loggedInUserDetails.Id);
        this.calculateTotalCost(this.cartList);
        localStorage.setItem('cartItems', JSON.stringify(this.allCartItems));
    }
   
    removeFromCart(item: Cart): void {
        var itemIndex = this.allCartItems.indexOf(item);
        this.allCartItems.splice(itemIndex, 1); 
        this.cartList = this.allCartItems.filter(o => o.UserId == this.loggedInUserDetails.Id);
        this.calculateTotalCost(this.cartList);
        localStorage.setItem('cartItems', JSON.stringify(this.allCartItems));
    }
    continueShopping(): void {
        this.router.navigate(['/product']);
    }
    calculateTotalCost(cartList: Cart[]): void {
        this.subTotalPrice = 0;
        for (var i = 0; i < cartList.length; i++) {
            this.subTotalPrice += cartList[i].Quantity * cartList[i].Price;
        }
    }
    //LoadUsers(): void {
    //    this.indLoading = true;
    //    this._userService.get(Global.BASE_USER_ENDPOINT)
    //        .subscribe(users => {
    //            this.users = users;
    //            if (this.loggedInUserDetails.UserRole != Roles.SuperAdmin)
    //                this.users = this.users.filter(x => x.CompanyId == this.loggedInUserDetails.CompanyId);
    //            this.indLoading = false;
    //        },
    //        error => this.msg = <any>error);
    //}
    //LoadAllCompanies(): void {

    //    this._companyService.get(Global.BASE_COMPANY_ENDPOINT)
    //        .subscribe(companies => { this.companies = companies },
    //        error => this.msg = <any>error);
    //}


    //editUser(id: number) {
    //    this.dbops = DBOperation.update;
    //    this.SetControlsState(true);
    //    this.modalTitle = "Edit User";
    //    this.modalBtnTitle = "Update";
    //    this.securityQuestion = Global.SECURITY_QUESTION;
    //    this.LoadAllCompanies();
    //    this.LoadUsers();
    //    this.user = this.users.filter(x => x.Id == id)[0];
    //    this.userFrm.patchValue(this.user);
    //    this.modal.open();
    //}

    //deleteUser(id: number) {
    //    this.dbops = DBOperation.delete;
    //    this.SetControlsState(false);
    //    this.modalTitle = "Confirm to Delete?";
    //    this.modalBtnTitle = "Delete";
    //    this.user = this.users.filter(x => x.Id == id)[0];
    //    this.userFrm.patchValue(this.user);
    //    this.modal.open();
    //}

    //onSubmit(formData: any) {
    //    this.msg = "";

    //    switch (this.dbops) {

    //        case DBOperation.update:
    //            this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
    //                data => {
    //                    if (data == 1) //Success
    //                    {

    //                        this.msg = "Updated Successfully";
    //                        if (this.loggedInUserDetails.Id == formData._value.Id)
    //                            this.deleteLocalCurrentUserAndReload();

    //                    }
    //                    else {
    //                        this.msg = "There is some issue in saving records, please contact to system administrator!"
    //                    }

    //                    this.modal.dismiss();
    //                },
    //                error => {
    //                    this.msg = error;
    //                }
    //            );
    //            break;

    //        case DBOperation.delete:
    //            this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
    //                data => {
    //                    if (data == 1) //Success
    //                    {
    //                        if (this.loggedInUserDetails.Id == formData._value.Id)
    //                            this.deleteLocalCurrentUserAndReload();
    //                        this.msg = "Data successfully deleted.";
    //                        this.LoadUsers();
    //                    }
    //                    else {
    //                        this.msg = "There is some issue in saving records, please contact to system administrator!"
    //                    }

    //                    this.modal.dismiss();
    //                },
    //                error => {
    //                    this.msg = error;
    //                }
    //            );
    //            break;

    //    }
    //}
    //Delete if logged in user has bee update
    //deleteLocalCurrentUserAndReload(): void {
    //    localStorage.removeItem('currentUser');
    //    window.location.reload();
    //}

    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.userFrm.enable() : this.userFrm.disable();
    //}
    //criteriaChange(value: string): void {
    //    if (value != '[object Event]')
    //        this.listFilter = value;

    //}
}