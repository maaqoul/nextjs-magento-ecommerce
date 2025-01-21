import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on ProductInterface {
    id
    sku
    name
    description {
      html
    }
    short_description {
      html
    }
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
        discount {
          amount_off
          percent_off
        }
      }
    }
    media_gallery {
      url
      label
      position
    }
    stock_status
    categories {
      id
      name
      url_path
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts(
    $pageSize: Int = 10
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
  ) {
    products(pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
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

export const GET_PRODUCT_BY_SKU = gql`
  query GetProductBySku($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...ProductFields
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_CATEGORIES = gql`
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
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts(
    $search: String!
    $pageSize: Int = 10
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
    $filter: ProductAttributeFilterInput
  ) {
    products(
      search: $search
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
      filter: $filter
    ) {
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
