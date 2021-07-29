import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
// import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UrbanPipeService {

  constructor(private http: HttpClient) { }
  addStore() {
    var data = "{\"stores\":[{\"city\":\"Chennai\",\"name\":\"FBCakes\",\"min_pickup_time\":900,\"min_delivery_time\":1800,\"contact_phone\":\"98234566222\",\"notification_phones\":[\"+919134345345\",\"98234566778\"],\"ref_id\":\"1234567892584\",\"min_order_value\":200,\"hide_from_ui\":false,\"address\":\"60, RGM Complex, OMR Road, Karapakkam\",\"notification_emails\":[\"b1@mail.com\",\"b2@mail.com\"],\"zip_codes\":[\"560033\",\"560022\"],\"geo_longitude\":80.2291568,\"active\":true,\"geo_latitude\":12.9137880,\"ordering_enabled\":true}],\"translations\":[{\"language\":\"fr\", \"name\":\"c\'est un magasin\"}]}"
    return this.http.post("https://staging.urbanpiper.com/external/api/v1/stores/", data, {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json"
      })
    })
  }
  storeAction() {
    // var data= "{\"stores\":[{\"city\":\"Bangalore\",\"name\":\"Koramanagala\",\"min_pickup_time\":900,\"min_delivery_time\":1800,\"contact_phone\":\"98234566222\",\"notification_phones\":[\"+919134345345\",\"98234566778\"],\"ref_id\":\"5916020652145\",\"min_order_value\":200,\"hide_from_ui\":false,\"address\":\"2nd Cross 5th Main\",\"notification_emails\":[\"b1@mail.com\",\"b2@mail.com\"],\"zip_codes\":[\"560033\",\"560022\"],\"geo_longitude\":22.234324,\"active\":true,\"geo_latitude\":19.12312,\"ordering_enabled\":true},{\"city\":\"delhi\",\"name\":\"Connaught Place\",\"min_pickup_time\":900,\"min_delivery_time\":1800,\"contact_phone\":\"+9172342222332\",\"notification_phones\":[\"7234222233\",\"+917234222555\"],\"ref_id\":\"6906011059645\",\"min_order_value\":200,\"hide_from_ui\":false,\"address\":\"Sector 21, D - block\",\"notification_emails\":[\"d1@mail.com\",\"d2@mail.com\"],\"zip_codes\":[\"110021\",\"2312323\"],\"geo_longitude\":22.234324,\"active\":false,\"geo_latitude\":19.12312,\"ordering_enabled\":true}],\"translations\":[{\"language\":\"fr\", \"name\":\"c\'est un magasin\"}]}"
    var data = "{\t\"location_ref_id\": \"1234567892584\",\t\"platforms\": [\"zomato\"],\t\"action\": \"enable\"}"
    //   var data2 = {
    //     "location_ref_id": "6906011059645",
    //     "platforms": ["zomato"],
    //     "action": "disable"
    // }
    // var data = JSON.stringify(data2);
    console.log(data);
    return this.http.post("https://staging.urbanpiper.com/hub/api/v1/location/", data, {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json",
      })
    })
  }
  catalogue() {
    var data = "{\"categories\":[{\"ref_id\":\"C-123\",\"name\":\"Breads1\",\"description\":\"Remote category åß˙\",\"sort_order\":1,\"active\":true,\"img_url\":\"https://static.giantbomb.com/uploads/scale_small/0/6087/2437349-pikachu.png\"},{\"ref_id\":\"C-124\",\"name\":\"Sliders\",\"description\":\"Another one ˚∫∆˙∫\",\"sort_order\":1,\"active\":true,\"img_url\":\"https://static.giantbomb.com/uploads/scale_small/0/6087/2437349-pikachu.png\",\"parent_ref_id\":\"C-123\"}],\"items\":[{\"ref_id\":\"XX-1225\",\"title\":\"Whole grain\",\"available\":true,\"description\":\"Super healthy\",\"sold_at_store\":true,\"price\":41.0,\"current_stock\":24,\"recommended\":true,\"food_type\":\"2\",\"category_ref_ids\":[\"C-123\"]},{\"ref_id\":\"XX-1226\",\"title\":\"Parsley\",\"description\":\"very taasty\",\"available\":false,\"sold_at_store\":true,\"img_url\":\"http://image.com/media/2017/03/20/B50_500_x_500.png\",\"sort_order\":123,\"price\":145.0,\"current_stock\":1,\"category_ref_ids\":[\"C-124\"]}],\"option_groups\":[{\"ref_id\":\"OG-1234\",\"title\":\"This G-1 group\",\"min_selectable\":1,\"max_selectable\":1,\"active\":true},{\"ref_id\":\"OG-1235\",\"title\":\"This G-2 group\",\"min_selectable\":1,\"max_selectable\":1,\"active\":true}],\"options\":[{\"ref_id\":\"opt-0112233\",\"title\":\"Opt integra 1\",\"description\":\"option through integration\",\"weight\":123,\"available\":true,\"price\":123.23,\"sold_at_store\":true,\"opt_grp_ref_ids\":[\"OG-1234\"],\"nested_opt_grps\":[\"OG-1235\"]},{\"ref_id\":\"opt-0112234\",\"title\":\"Opt integra 2\",\"description\":\"option through integration\",\"weight\":123,\"available\":true,\"price\":123.23,\"sold_at_store\":true,\"opt_grp_ref_ids\":[\"OG-1235\"]}],\"callback_url\":\"https://enp27ugn0clof.x.pipedream.net/\"}";
    console.log(data);
    return this.http.post("https://staging.urbanpiper.com/external/api/v1/inventory/locations/5916020652145/", data, {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json"
      })
    })
  }
  items() {
    // var data = "{\"categories\":[{\"ref_id\":\"C-123\",\"name\":\"Breads\",\"description\":\"Remote category åß˙\",\"sort_order\":1,\"active\":true,\"img_url\":\"https://static.giantbomb.com/uploads/scale_small/0/6087/2437349-pikachu.png\"},{\"ref_id\":\"C-124\",\"name\":\"Sliders\",\"description\":\"Another one ˚∫∆˙∫\",\"sort_order\":1,\"active\":true,\"img_url\":\"https://static.giantbomb.com/uploads/scale_small/0/6087/2437349-pikachu.png\",\"parent_ref_id\":\"C-123\"}],\"items\":[{\"ref_id\":\"XX-1225\",\"title\":\"Whole grain\",\"available\":true,\"description\":\"Super healthy\",\"sold_at_store\":true,\"price\":41.0,\"current_stock\":24,\"recommended\":true,\"food_type\":\"2\",\"category_ref_ids\":[\"C-123\"]},{\"ref_id\":\"XX-1226\",\"title\":\"Parsley\",\"description\":\"very taasty\",\"available\":false,\"sold_at_store\":true,\"img_url\":\"http://image.com/media/2017/03/20/B50_500_x_500.png\",\"sort_order\":123,\"price\":145.0,\"current_stock\":1,\"category_ref_ids\":[\"C-124\"]}],\"option_groups\":[{\"ref_id\":\"OG-1234\",\"title\":\"This G-1 group\",\"min_selectable\":1,\"max_selectable\":1,\"active\":true},{\"ref_id\":\"OG-1235\",\"title\":\"This G-2 group\",\"min_selectable\":1,\"max_selectable\":1,\"active\":true}],\"options\":[{\"ref_id\":\"opt-0112233\",\"title\":\"Opt integra 1\",\"description\":\"option through integration\",\"weight\":123,\"available\":true,\"price\":123.23,\"sold_at_store\":true,\"opt_grp_ref_ids\":[\"OG-1234\"],\"nested_opt_grps\":[\"OG-1235\"]},{\"ref_id\":\"opt-0112234\",\"title\":\"Opt integra 2\",\"description\":\"option through integration\",\"weight\":123,\"available\":true,\"price\":123.23,\"sold_at_store\":true,\"opt_grp_ref_ids\":[\"OG-1235\"]}],\"callback_url\":\"https://enp27ugn0clof.x.pipedream.net/\"}";
    var data = '{"location_ref_id": "1234567892584","item_ref_ids": ["XX-1225"],"action": "enable"}'
    console.log(data);
    return this.http.post("https://staging.urbanpiper.com/hub/api/v1/items/", data, {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json"
      })
    })
  }
  get() {
    return this.http.get("https://staging.urbanpiper.com//external/api/v1/webhooks/", {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json"
      })
    })
  }
  webhoohk() {
    var data = "{\n    \"active\": true,\n    \"event_type\": \"order_placed\",\n    \"retrial_interval_units\": \"seconds\",\n    \"url\": \"https://biz1pos.azurewebsites.net/api/Values/write\",\n    \"headers\": {\n    \t\"content-type\": \"application/json\",\n    \t\"x_api_token\": \"4trgfdsfd243tg54342rewfcef\"\n    }\n}";
    return this.http.post("https://staging.urbanpiper.com/external/api/v1/webhooks/", data, {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json"
      })
    })
  }
  gethooks() {
    var id = 696;
    return this.http.get("https://staging.urbanpiper.com/external/api/v1/webhooks/700", {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json"
      })
    })
  }
  orderstatus() {
    var data = "{\n\t\"new_status\": \"Mark_Food_Ready\",\n\t\"message\": \"Order dispatched with rider\"\n}\n";
    return this.http.put("https://staging.urbanpiper.com/external/api/v1/orders/16019/status/", data, {
      headers: new HttpHeaders({
        "Authorization": "apikey biz_adm_clients_ggfbSgijDIRJ:5641ddc76592b65363b218f939a932a920b542ba",
        "Content-Type": "application/json"
      })
    })
  }
  toFormData(formValue) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
// "cache-control": "no-cache",
// "Accept": "*/*",
// "Accept-Encoding": "gzip, deflate",
// "Cache-Control": "no-cache",
// "Connection": "keep-alive",
// "Content-Length": "96",
// "Cookie": "__cfduid=d7e4ec94a20387d7ccc49e9eac0fa00e31564582300",
// "Host": "staging.urbanpiper.com",
// "Postman-Token": "95ad41a3-22de-42a8-a717-dde8bfe23364,b0c14390-8a61-4c5d-b6e2-a6602cbb1142",
// "User-Agent": "PostmanRuntime/7.17.1",
