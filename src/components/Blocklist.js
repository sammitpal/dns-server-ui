import React, { useState, useEffect } from 'react';
import './Blocklist.css';
import { YouTube, Facebook, Instagram, Language } from '@mui/icons-material'; // Import Material-UI icons

const initialAppsData = [
  { id: 1, name: 'YouTube', domain: 'youtube.com', icon: <YouTube />, blocked: false },
  { id: 2, name: 'Facebook', domain: 'facebook.com', icon: <Facebook />, blocked: false },
  { id: 3, name: 'Instagram', domain: 'instagram.com', icon: <Instagram />, blocked: false },
  { id: 4, name: 'Twitter', domain: 'twitter.com', icon: <Language />, blocked: false },
  { id: 5, name: 'Snapchat', domain: 'snapchat.com', icon: <Language />, blocked: false },
  { id: 6, name: 'WhatsApp', domain: 'whatsapp.com', icon: <Language />, blocked: false },
  { id: 7, name: 'TikTok', domain: 'tiktok.com', icon: <Language />, blocked: false },
  { id: 8, name: 'Reddit', domain: 'reddit.com', icon: <Language />, blocked: false },
  { id: 9, name: 'Pinterest', domain: 'pinterest.com', icon: <Language />, blocked: false },
  { id: 10, name: 'LinkedIn', domain: 'linkedin.com', icon: <Language />, blocked: false },
  { id: 11, name: 'Twitch', domain: 'twitch.tv', icon: <Language />, blocked: false },
  { id: 12, name: 'Spotify', domain: 'spotify.com', icon: <Language />, blocked: false },
  { id: 13, name: 'Netflix', domain: 'netflix.com', icon: <Language />, blocked: false },
  { id: 14, name: 'Hulu', domain: 'hulu.com', icon: <Language />, blocked: false },
  { id: 15, name: 'Amazon Prime Video', domain: 'primevideo.com', icon: <Language />, blocked: false },
  { id: 16, name: 'Disney+', domain: 'disneyplus.com', icon: <Language />, blocked: false },
  { id: 17, name: 'HBO Max', domain: 'hbomax.com', icon: <Language />, blocked: false },
  { id: 18, name: 'Zoom', domain: 'zoom.us', icon: <Language />, blocked: false },
  { id: 19, name: 'Microsoft Teams', domain: 'teams.microsoft.com', icon: <Language />, blocked: false },
  { id: 20, name: 'Google Meet', domain: 'meet.google.com', icon: <Language />, blocked: false },
  { id: 21, name: 'Skype', domain: 'skype.com', icon: <Language />, blocked: false },
  { id: 22, name: 'Dropbox', domain: 'dropbox.com', icon: <Language />, blocked: false },
  { id: 23, name: 'Google Drive', domain: 'drive.google.com', icon: <Language />, blocked: false },
  { id: 24, name: 'OneDrive', domain: 'onedrive.live.com', icon: <Language />, blocked: false },
  { id: 25, name: 'GitHub', domain: 'github.com', icon: <Language />, blocked: false },
  { id: 26, name: 'GitLab', domain: 'gitlab.com', icon: <Language />, blocked: false },
  { id: 27, name: 'Slack', domain: 'slack.com', icon: <Language />, blocked: false },
  { id: 28, name: 'Trello', domain: 'trello.com', icon: <Language />, blocked: false },
  { id: 29, name: 'Asana', domain: 'asana.com', icon: <Language />, blocked: false },
  { id: 30, name: 'Notion', domain: 'notion.so', icon: <Language />, blocked: false },
  { id: 31, name: 'Figma', domain: 'figma.com', icon: <Language />, blocked: false },
  { id: 32, name: 'Canva', domain: 'canva.com', icon: <Language />, blocked: false },
  { id: 33, name: 'Quora', domain: 'quora.com', icon: <Language />, blocked: false },
  { id: 34, name: 'Coursera', domain: 'coursera.org', icon: <Language />, blocked: false },
  { id: 35, name: 'Udemy', domain: 'udemy.com', icon: <Language />, blocked: false },
  { id: 36, name: 'Khan Academy', domain: 'khanacademy.org', icon: <Language />, blocked: false },
  { id: 37, name: 'Medium', domain: 'medium.com', icon: <Language />, blocked: false },
  { id: 38, name: 'Wikipedia', domain: 'wikipedia.org', icon: <Language />, blocked: false },
  { id: 39, name: 'Stack Overflow', domain: 'stackoverflow.com', icon: <Language />, blocked: false },
  { id: 40, name: 'Flipkart', domain: 'flipkart.com', icon: <Language />, blocked: false },
  { id: 41, name: 'Amazon', domain: 'amazon.in', icon: <Language />, blocked: false },
  { id: 42, name: 'eBay', domain: 'ebay.com', icon: <Language />, blocked: false },
  { id: 43, name: 'PayPal', domain: 'paypal.com', icon: <Language />, blocked: false },
  { id: 44, name: 'AliExpress', domain: 'aliexpress.com', icon: <Language />, blocked: false },
  { id: 45, name: 'Zomato', domain: 'zomato.com', icon: <Language />, blocked: false },
  { id: 46, name: 'Swiggy', domain: 'swiggy.com', icon: <Language />, blocked: false },
  { id: 47, name: 'Uber Eats', domain: 'ubereats.com', icon: <Language />, blocked: false },
  { id: 48, name: 'Uber', domain: 'uber.com', icon: <Language />, blocked: false },
  { id: 49, name: 'Ola', domain: 'ola.com', icon: <Language />, blocked: false },
  { id: 50, name: 'MakeMyTrip', domain: 'makemytrip.com', icon: <Language />, blocked: false },
  { id: 51, name: 'Booking.com', domain: 'booking.com', icon: <Language />, blocked: false },
  { id: 52, name: 'Expedia', domain: 'expedia.com', icon: <Language />, blocked: false },
  { id: 53, name: 'Airbnb', domain: 'airbnb.com', icon: <Language />, blocked: false },
  { id: 54, name: 'Cleartrip', domain: 'cleartrip.com', icon: <Language />, blocked: false },
  { id: 55, name: 'Zoomcar', domain: 'zoomcar.com', icon: <Language />, blocked: false },
];


const BlockedApps = () => {
  const [apps, setApps] = useState(initialAppsData);
  const [dnsActive, setDnsActive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/status')
      .then((res) => res.json())
      .then((data) => setDnsActive(!data.serverStatus))
      .catch((err) => console.error('Error fetching DNS status:', err));

    fetch('http://localhost:8080/blocklist')
      .then((res) => res.json())
      .then((blocklist) => {
        const updatedApps = initialAppsData.map((app) => ({
          ...app,
          blocked: blocklist.includes(app.domain), // Match backend blocklist by domain
        }));
        setApps(updatedApps);
      })
      .catch((err) => console.error('Error fetching blocklist:', err));
  }, []);

  const toggleBlockStatus = async (id) => {
    const app = apps.find((a) => a.id === id);
    if (!app) return;

    const updatedApps = apps.map((a) =>
      a.id === id ? { ...a, blocked: !a.blocked } : a
    );

    try {
      const response = await fetch(`http://localhost:8080/blocklist`, {
        method: app.blocked ? 'DELETE' : 'POST', // Block or unblock based on current status
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: app.domain }), // Use domain instead of name
      });

      if (!response.ok) {
        throw new Error('Failed to update blocklist');
      }

      setApps(updatedApps);
    } catch (err) {
      console.error('Error updating blocklist:', err);
    }
  };

  return (
    <div className="blocked-apps-container card">
      <h2>Blocked Apps</h2>
      {dnsActive ? (
        <div className="app-list">
          {apps.map((app) => (
            <li
              onClick={() => toggleBlockStatus(app.id)}
              key={app.id}
              className={`app-item ${app.blocked ? 'blocked' : 'unblocked'}`}
            >
              <div className="app-icon">{app.icon}</div>
              <div className="app-name">{app.name}</div>              
            </li>
          ))}
        </div>
      ) : (
        <p>DNS server is not active. Please start the DNS server to manage the blocklist.</p>
      )}
    </div>
  );
};

export default BlockedApps;
