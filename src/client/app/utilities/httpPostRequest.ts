// Utility function to make a POST request
export default async function httpPostRequest<T>(url: string, data: T): Promise<any> {
  console.log(data)
  try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON response body
      return await response.json();
    } catch (error) {
      console.error('Error making POST request:', error);
      throw error; // Re-throw the error for further handling
    }
  }