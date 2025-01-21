import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on ProductInterface {
    __typename
    id
    sku
    name
    url_key
    price_range {
      minimum_price {
        regular_price {
          value
          currency
        }
        final_price {
          value
          currency
        }
      }
    }
    image {
      url
      label
    }
    small_image {
      url
      label
    }
    description {
      html
    }
    stock_status
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($pageSize: Int = 12, $currentPage: Int = 1) {
    products(pageSize: $pageSize, currentPage: $currentPage) {
      items {
        ...ProductFields
      }
      total_count
      page_info {
        page_size
        current_page
        total_pages
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_URL_KEY = gql`
  query GetProductByUrlKey($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        ...ProductFields
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_CATEGORIES = gql`
  query GetCategories {
    categories {
      items {
        id
        level
        name
        path
        url_path
        url_key
        children_count
        children {
          id
          level
          name
          path
          url_path
          url_key
          children_count
        }
      }
    }
  }
`;
