This project is an API Automation Framework built using Playwright and TypeScript to test the Simple Books API.

The framework covers API authentication and the complete order lifecycle, including creating, retrieving, updating, and deleting orders.

Target API: https://simple-books-api.click

The following behaviors were verified through API testing:

Token-Based Authentication: The API generates an access token when a client registers successfully. The token is required as a Bearer token for order operations.

Order Lifecycle: Orders can be created, retrieved, updated, and deleted. The API returns HTTP 204 for successful update and delete operations.

Deleted Order Verification: After deleting an order, retrieving it by ID returns HTTP 404, and the deleted order is no longer present in the client's order list.

Running Tests:

npx playwright test (Runs all Tests)

For Typescript validation Run the following command
npx tsc --noEmit
