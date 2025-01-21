# Magento Integration Guide

This document outlines the requirements and specifications for integrating Magento with our Next.js frontend.

## API Requirements

### 1. Layout API Endpoint

#### Endpoint Specification

```
GET /rest/V1/cmsPage/layout
```

#### Required Parameters

- `type` (string): Page type identifier (e.g., "home", "category", "product")
- `identifier` (string, optional): Specific page identifier

#### Expected Response Format

```json
{
  "layout": {
    "type": string,      // Component identifier
    "props": {           // Component properties
      [key: string]: any
    },
    "children": [        // Optional nested components
      {
        "type": string,
        "props": object,
        "children": array
      }
    ]
  }
}
```

### 2. Supported Component Types

Our frontend currently supports these component types:

#### Product Card (`product-card`)

```json
{
  "type": "product-card",
  "props": {
    "product": {
      "id": number,
      "sku": string,
      "name": string,
      "price": number,
      "currency": string,
      "image": {
        "url": string,
        "label": string
      }
    }
  }
}
```

#### Product Grid (`product-grid`)

```json
{
  "type": "product-grid",
  "props": {
    "products": Array<Product>,
    "title": string,
    "subtitle": string
  }
}
```

#### Product List (`product-list`)

```json
{
  "type": "product-list",
  "props": {
    "products": Array<Product>,
    "pageSize": number,
    "currentPage": number,
    "totalCount": number
  }
}
```

#### Pagination (`pagination`)

```json
{
  "type": "pagination",
  "props": {
    "currentPage": number,
    "totalPages": number,
    "onPageChange": function
  }
}
```

## Example Layouts

### Home Page Layout

```json
{
  "layout": {
    "type": "product-grid",
    "props": {
      "title": "Latest Products",
      "subtitle": "Check out our newest arrivals",
      "products": [
        {
          "id": 1,
          "sku": "product-1",
          "name": "Product Name",
          "price": 99.99,
          "currency": "USD",
          "image": {
            "url": "https://example.com/image.jpg",
            "label": "Product Image"
          }
        }
      ]
    },
    "children": [
      {
        "type": "pagination",
        "props": {
          "currentPage": 1,
          "totalPages": 5
        }
      }
    ]
  }
}
```

## Implementation Steps for Magento Team

1. Create a new REST API endpoint:

   - Path: `/rest/V1/cmsPage/layout`
   - Method: GET
   - Add to `webapi.xml`

2. Create a new module:

   ```bash
   app/code/YourCompany/LayoutApi/
   ```

3. Implement the layout service:

   - Create data providers for each component type
   - Transform Magento data to match our component structure
   - Handle nested components

4. Add configuration in Magento admin:
   - Page type mappings
   - Component configurations
   - Layout builder interface (optional)

## Authentication

The API should support:

1. Guest access for public pages
2. Integration tokens for authenticated requests
3. Proper CORS headers for frontend access

## Error Handling

Return errors in this format:

```json
{
  "errors": [
    {
      "message": string,
      "code": string
    }
  ]
}
```

## Performance Considerations

1. Cache the layout responses:

   - Use proper cache tags
   - Set appropriate TTL
   - Implement cache invalidation

2. Optimize data loading:
   - Load only required fields
   - Use proper indexes
   - Implement batching where possible

## Testing Requirements

1. Create integration tests for:

   - Layout endpoint
   - Component data providers
   - Cache functionality

2. Provide test data:
   - Sample layouts for each page type
   - Test products with images
   - Various component configurations

## Development Workflow

1. Magento team provides:

   - API endpoint documentation
   - Sample responses
   - Test environment credentials

2. Frontend team provides:

   - Component specifications
   - Required data structure
   - Test cases

3. Integration testing:
   - Regular sync meetings
   - Shared test environment
   - Performance monitoring

## Deployment Considerations

1. Version control:

   - API versioning
   - Backward compatibility
   - Migration scripts

2. Environment setup:
   - CORS configuration
   - Cache settings
   - Security measures

## Support and Maintenance

1. Documentation requirements:

   - API documentation
   - Component specifications
   - Configuration guide

2. Monitoring:
   - Error tracking
   - Performance metrics
   - Usage statistics

## Contact Information

- Frontend Team Lead: [Name] (email)
- Magento Team Lead: [Name] (email)
- Project Manager: [Name] (email)
