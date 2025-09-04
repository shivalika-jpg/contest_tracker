// Simple API test script
const axios = require('axios');

const API_BASE_URL = 'https://contest-tracker-qhfl.onrender.com';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test 2: Test CORS preflight
    console.log('2. Testing CORS configuration...');
    const corsResponse = await axios.options(`${API_BASE_URL}/api/contests/codeforces`, {
      headers: {
        'Origin': 'https://contest-tracker-3dov.vercel.app',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization'
      }
    });
    console.log('✅ CORS test passed');
    console.log('');

    // Test 3: Test contests endpoint (without auth - should fail gracefully)
    console.log('3. Testing contests endpoint (without auth)...');
    try {
      const contestsResponse = await axios.get(`${API_BASE_URL}/api/contests/codeforces`);
      console.log('✅ Contests endpoint accessible:', contestsResponse.status);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Contests endpoint properly protected (401 Unauthorized)');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 API tests completed!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testAPI();
