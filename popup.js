$(document).ready(function() {
    console.log("Loaded Jquery!");
    var fields = ['name','jobTitle','website','taxId','causeId','donationRequest','eventTypeId','justification','fname','lname','email','phone','altPhone','address','country','zip','city','state','region','eventDate','attendance','eventGoal'];
    $("#save").on('click', function() {
        console.log("Clicked!");
        saveFormData();
        getFormData(fields, function(items) {
            if (items != null) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var activeTab = tabs[0];
                    console.log("Sending message..." + JSON.stringify(items));
                    chrome.tabs.sendMessage(activeTab.id, {"message": "data_sent","items":items});
                });
            }
            else {
                console.log("ERROR: Items returned null");
            }
        });
    });
    getFormData(fields, function(items) {
        if (items != null) {
            $("#request_donation_request").val(items['donationRequest']);
            $("#request_event_type_id").val(items['eventTypeId']);
            $("#request_justification").val(items['justification']);
            // $("#request_attachment").val(items['attachment']);

            $("#request_name").val(items['name']);
            $("#request_job_title").val(items['jobTitle']);
            $("#request_url").val(items['website']);
            $("#request_ein").val(items['taxId']);
            $("#request_cause_id").val(items['causeId']);

            $("#request_fname").val(items['fname']);
            $("#request_lname").val(items['lname']);
            $("#request_email").val(items['email']);
            $("#request_phone").val(items['phone']);
            $("#request_alt_phone").val(items['altPhone']);
            $("#request_address_1").val(items['address']);
            $("#request_org_country_code").val(items['country']);
            $("#request_zip").val(items['zip']);
            $("#request_city").val(items['city']);
            $("#request_state_id").val(items['state']);
            $("#request_region").val(items['region']);

            $("#request_event_date").val(items['eventDate']);
            $("#request_attendance").val(items['attendance']);
            $("#request_event_goal").val(items['eventGoal']);

            console.log("Assigning values: " + $('#request_event_date').val());
        }
        else {
            console.log("Init values not specified");
        }
    });
});
function saveFormData() {
    var $donationRequest = $("#request_donation_request").val();
    var $eventTypeId = $("#request_event_type_id").val();
    var $justification = $("#request_justification").val();
    // var $attachment = $("#request_attachment").val();

    var $name = $("#request_name").val();
    var $jobTitle = $("#request_job_title").val();
    var $website = $("#request_url").val();
    var $taxId = $("#request_ein").val();
    var $causeId = $("#request_cause_id").val();

    var $fname = $("#request_fname").val();
    var $lname = $("#request_lname").val();
    var $email = $("#request_email").val();
    var $phone = $("#request_phone").val();
    var $altPhone = $("#request_alt_phone").val();
    var $address = $("#request_address_1").val();
    var $country = $("#request_country_code").val();
    var $zip = $("#request_zip").val();
    var $city = $("#request_city").val();
    var $state = $("#request_state_id").val();
    var $region = $("#request_region").val();

    var $eventDate = $("#request_event_date").val();
    var $attendance = $("#request_attendance").val();
    var $eventGoal = $("#request_event_goal").val();


    if (!$donationRequest || !$jobTitle) {
        console.log("ERROR: Data not specified in required fields!");
        return;
    }
    chrome.storage.sync.set({'donationRequest':$donationRequest,'eventTypeId':$eventTypeId,'justification':$justification,'name': $name, 'jobTitle': $jobTitle, 'website':$website, 'taxId':$taxId,'causeId':$causeId,'fname':$fname,'lname':$lname,'email':$email,'phone':$phone,'altPhone':$altPhone,'address':$address,'country':$country,'zip':$zip,'city':$city,'state':$state,'region':$region,'eventDate':$eventDate,'attendance':$attendance,'eventGoal':$eventGoal}, function() {
        console.log("Settings saved!");
    });
}
function getFormData(key, callback) {
    chrome.storage.sync.get(key, (items) => {
        console.log('Returned: ' + items['name']);
        callback(items);
    });
}