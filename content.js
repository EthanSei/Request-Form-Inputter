console.log('loaded Content script!');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received!");
    if (request.message === "data_sent") {
        var items = request.items;
        document.getElementById('request_donation_request').value = items['donationRequest'];
        document.getElementById('request_event_type_id').value = items['eventTypeId'];
        document.getElementById('request_justification').value = items['justification'];
        // document.getElementById('request_attachment').value = items['attachment'];

        document.getElementById('request_name').value = items['name'];
        document.getElementById('request_job_title').value = items['jobTitle'];
        document.getElementById('request_url').value = items['website'];
        document.getElementById('request_ein').value = items['taxId'];
        document.getElementById('request_cause_id').value = items['causeId'];

        document.getElementById('request_fname').value = items['fname'];
        document.getElementById('request_lname').value = items['lname'];
        document.getElementById('request_email').value = items['email'];
        document.getElementById('request_phone').value = items['phone'];
        document.getElementById('request_alt_phone').value = items['altPhone'];
        document.getElementById('request_address_1').value = items['address'];
        document.getElementById('request_country_code').value = items['country'];
        document.getElementById('request_zip').value = items['zip'];
        document.getElementById('request_city').value = items['city'];
        document.getElementById('request_state_id').value = items['state'];
        document.getElementById('request_region').value = items['region'];

        document.getElementById('request_event_date').value = items['eventDate'];
        document.getElementById('request_attendance').value = items['attendance'];
        document.getElementById('request_event_goal').value = items['eventGoal'];
    }
});