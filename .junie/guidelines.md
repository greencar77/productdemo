# Angular Homework: Configurable Product Manager

## Objective

Create a small Angular application for managing products.

Product attributes must be defined in a configuration, and the product form must be generated dynamically from that configuration.

An editor for changing the attribute configuration is **not required**. The configuration can be stored directly in the source code.

## Example attribute configuration

The exact structure is up to you, but it could look like this:

```typescript
const productAttributes = [
  {
    key: 'name',
    label: 'Product name',
    type: 'text',
    required: true
  },
  {
    key: 'price',
    label: 'Price',
    type: 'number',
    required: true
  },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    options: ['Electronics', 'Food', 'Clothing']
  },
  {
    key: 'available',
    label: 'Available',
    type: 'boolean'
  }
];
```

The application should generate the appropriate form controls based on this configuration.

## Required functionality

Users should be able to:

- View a list of products
- View the details of a product
- Add a product
- Edit a product and its attribute values
- Delete a product

The dynamic form should support at least:

- Text fields
- Number fields
- Checkboxes or boolean fields
- Select fields
- Required-field validation

Changing or adding an attribute in the source-code configuration should automatically affect the add and edit forms without requiring a new form field to be manually added to the template.

Store the products locally, for example using `localStorage`, so that they remain available after refreshing the browser.

## Angular expectations

Use Angular and structure the application in a way that you consider reasonable.

You may use Angular CLI and `ng generate` to create the project and its components. Reactive Forms are recommended for generating the form dynamically.

There are no strict requirements regarding:

- The exact number of components
- Routing structure
- State-management approach
- Styling framework
- Test coverage

Automated tests are welcome but not required. The main expectation is that the application works and that you can explain your implementation decisions.

## Scope clarification

You do **not** need to:

- Build an attribute-configuration editor
- Use a backend or database
- Implement authentication
- Handle migration of existing products when an attribute changes type
- Create production-level styling
- Support every possible input type

If a new attribute is added to the configuration, older products may simply show an empty or default value for that attribute.

## AI usage

You may use AI tools, documentation, tutorials, and other resources.

You remain responsible for understanding the submitted code and should be ready to explain which parts were created or influenced by AI.

## Working process

Use Git while developing the application.

Please make several meaningful commits that reflect the development process rather than submitting the entire application as one large commit. The commit history does not need to be perfect or extensive.

## Review session

Be prepared to share your screen and:

- Start and demonstrate the application
- Add, view, edit, and delete a product
- Show that the form is generated from the attribute configuration
- Explain the main parts of the implementation
- Explain how product data is stored
- Answer questions about the code
- Make a small change if requested, such as adding another configured attribute

The goal is not to produce a production-ready system. The goal is to demonstrate basic Angular knowledge, problem-solving, and an understanding of the submitted solution.