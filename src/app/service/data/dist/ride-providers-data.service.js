"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RideProvidersDataService = void 0;
var core_1 = require("@angular/core");
var RideProvidersDataService = /** @class */ (function () {
    function RideProvidersDataService(http) {
        this.http = http;
        this.rideProviderUrl = 'http://localhost:8081/api/rideProviders';
        this.smilesUrl = 'http://localhost:8081/api/smiles';
    }
    RideProvidersDataService.prototype.registerRideProvider = function (data) {
        return this.http.post(this.rideProviderUrl + "/new", data);
    };
    RideProvidersDataService.prototype.getBilling = function () {
        return this.http.get('localhost:8081/api/rideProviders/billing?rpId=RPAM01&month=3');
    };
    RideProvidersDataService.prototype.registerRide = function (rideDto) {
        console.log(this.http.post(this.rideProviderUrl + "/addbooking", rideDto));
        return this.http.post(this.rideProviderUrl + "/addbooking", rideDto);
    };
    RideProvidersDataService.prototype.updateRideProvider = function (rpId, data) {
        console.log(rpId);
        return this.http.put(this.rideProviderUrl + "/" + rpId + "/update", data);
    };
    RideProvidersDataService.prototype.getRideProvider = function (rpId) {
        var url = this.rideProviderUrl + "/get/" + rpId;
        return this.http.get(url);
    };
    RideProvidersDataService.prototype.deleteRideProvider = function (rpId) {
        if (rpId) {
            var url = this.rideProviderUrl + "/" + rpId + "/update";
            return this.http.put(url, null);
        }
        throw new Error('not registered');
    };
    RideProvidersDataService.prototype.getSmilesReport = function (month, rpId) {
        return this.http.get(this.smilesUrl + "/" + month + "/" + rpId);
    };
    RideProvidersDataService.prototype.getRides = function (rpId) {
        var url = this.rideProviderUrl + "get/" + rpId;
        return this.http.get(url);
    };
    RideProvidersDataService.prototype.updateRides = function (tripId, data) {
        return this.http.put("localhost:8081/api/rideProviders/bookings/" + tripId, data);
    };
    RideProvidersDataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RideProvidersDataService);
    return RideProvidersDataService;
}());
exports.RideProvidersDataService = RideProvidersDataService;
