import searchSubscriptionRequests from "./searchSubscriptionRequests";
import isSubscriptionRequestChangeableBizNumber from "./isSubscriptionRequestChangeableBizNumber";
import getSubscriptionRequest from "./getSubscriptionRequest";
import getSale from "./getSale";
const queries = {
    isSubscriptionRequestChangeableBizNumber:isSubscriptionRequestChangeableBizNumber,
    searchSubscriptionRequests: searchSubscriptionRequests,
    getSubscriptionRequest : getSubscriptionRequest,
    getSale : getSale
};

export default queries;