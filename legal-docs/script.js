document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const form = document.getElementById('doc-form');
  const resultDiv = document.getElementById('result');
  const downloadBtn = document.getElementById('download-btn');
  const loadingOverlay = document.getElementById('loading-overlay');

  // Form Submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    showLoading();

    // Get exact time (e.g., "April 19, 2025 at 3:45 PM")
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const data = {
      yourName: document.getElementById('your-name').value,
      clientName: document.getElementById('client-name').value,
      service: document.getElementById('service').value,
      timestamp: timestamp
    };

    // Compact template with smaller text
    resultDiv.innerHTML = `
      <div style="font-size: 13px; line-height: 1.4;">
        <h2 style="font-size: 16px; text-align: center;">SERVICE AGREEMENT</h2>
        <p style="text-align: center;"><small>Created: ${data.timestamp}</small></p>
        
        <p>This agreement between <strong>${data.yourName}</strong> and <strong>${data.clientName}</strong> 
        was executed on ${now.toLocaleDateString()} for the following service:</p>
        
        <p style="background: #f5f5f5; padding: 8px; border-radius: 4px;">
          ${data.service}
        </p>
        
        <div style="display: flex; justify-content: space-between; margin-top: 40px;">
          <div>
            <p>_________________________</p>
            <p>${data.yourName}</p>
          </div>
          <div>
            <p>_________________________</p>
            <p>${data.clientName}</p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('doc-area').style.display = 'block';
    hideLoading();
  });

  // PDF Download (Optimized for Business Use)
  downloadBtn.addEventListener('click', function() {
    showLoading();
    
    const opt = {
      margin: 10,
      filename: `Contract_${new Date().getTime()}.pdf`,
      html2canvas: { 
        scale: 2,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4',
        hotfixes: ["px_scaling"] // Fixes text sizing
      }
    };

    // Wait 0.5s to ensure rendering completes
    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(resultDiv)
        .save()
        .finally(hideLoading);
    }, 500);
  });

  function showLoading() {
    loadingOverlay.style.display = 'flex';
  }

  function hideLoading() {
    loadingOverlay.style.display = 'none';
  }
});