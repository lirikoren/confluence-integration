
import axios, { AxiosError } from 'axios';
import { expect } from 'chai';

describe('Confluence Integration Tests', function() {

  const baseUrl = 'https://lirikoren57.atlassian.net/wiki/rest/api/'; // my domain
  const spaceKey = 'CI';  // my space key

  // Helper function to check if error type 
  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }

  // Test: should list pages in the space
  it('should list pages in the space', async function() {
    try {
      const response = await axios.get(`${baseUrl}space/${spaceKey}/content/page`);
  
      expect(response.status).to.equal(200);
      
      // Ensure the 'results' array is present and not empty
      expect(response.data.results).to.be.an('array').that.is.not.empty;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error occurred:', error.response?.data);
        throw error;
      } else {
        throw error;
      }
    }
  });
  

  // Test: should get page content
  it('should get page content', async function() {
    const pageId = '1016059'; // Example page ID
    try {
      const response = await axios.get(`${baseUrl}content/${pageId}`);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('title');
      expect(response.data.title).to.be.a('string');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error occurred:', error.response?.data);
        throw error;
      } else {
        throw error;
      }
    }
  });

  // Test: should throw an error if the space does not exist
  it('should return 404 if the space does not exist', async function() {
    const invalidSpaceKey = 'INVALID_SPACE';
    try {
      await axios.get(`${baseUrl}space/${invalidSpaceKey}/content/page`);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        expect(error.response?.status).to.equal(404);
      } else {
        throw error;
      }
    }
  });

  // Test: should handle errors when getting page content for a non-existent page
  it('should return 404 if the page does not exist', async function() {
    const nonExistentPageId = '9999999'; // Example non-existent page ID
    try {
      await axios.get(`${baseUrl}content/${nonExistentPageId}`);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        expect(error.response?.status).to.equal(404);
      } else {
        throw error;
      }
    }
  });
});
