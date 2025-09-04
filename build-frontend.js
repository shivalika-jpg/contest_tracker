const fs = require('fs-extra');
const path = require('path');

async function buildFrontend() {
  try {
    console.log('🔨 Building frontend for Vercel deployment...');
    
    // Create public directory
    const publicDir = path.join(__dirname, 'public');
    
    // Remove existing public directory
    if (fs.existsSync(publicDir)) {
      await fs.remove(publicDir);
    }
    
    // Copy frontend files to public directory
    await fs.copy(path.join(__dirname, 'frontend'), publicDir);
    
    console.log('✅ Frontend built successfully!');
    console.log('📁 Files copied to public/ directory');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildFrontend();
