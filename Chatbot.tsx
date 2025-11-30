"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

// Comprehensive Knowledge Base for Eco-Brickster Bot
// Only public information - no sensitive/internal details
const FAQ_ANSWERS: Record<string, string> = {
  // 1. About Eco-Brickster
  "what is eco-brickster": "Eco-Brickster converts plastic waste into strong, durable construction bricks. We transform discarded plastic into powerful building blocks — creating homes, schools, and hope across communities. Visit our About page to learn more!",
  "about eco-brickster": "Eco-Brickster is a platform that turns plastic waste into eco-friendly construction bricks. Our mission is to reduce pollution, build affordable spaces, and create a circular economy. We're making a real impact in communities across India.",
  "what problem does eco-brickster solve": "We solve plastic waste pollution by converting it into valuable building materials. This reduces landfill waste, prevents ocean pollution, and provides affordable construction solutions for communities.",
  "how does it work": "Plastic waste is collected from communities, cleaned thoroughly, melted, reinforced with safe additives, and molded into strong bricks. The process is safe, tested, and creates durable construction materials.",
  "why are these bricks special": "Our bricks are 3× stronger than clay bricks, waterproof, heat-resistant, lightweight, and made from 100% recycled plastic. They're tested in labs and proven in real projects across villages.",
  "mission": "Our mission is simple yet revolutionary — turning waste into worth, pollution into purpose, and plastic into power. We're building tomorrow from today's waste.",
  "vision": "Building tomorrow from today's waste. Creating a sustainable future where plastic waste becomes valuable building materials that help communities thrive.",
  "who are you": "Eco-Brickster is a sustainable construction materials company that transforms plastic waste into eco-friendly bricks. We work with communities, NGOs, and builders to create positive environmental and social impact.",
  "company": "Eco-Brickster is dedicated to converting plastic waste into construction materials. We're building a sustainable future, one brick at a time.",

  // 2. Products - Comprehensive Details
  "products": "We offer three types of eco-bricks:\n\n1. Standard Eco-Brick - ₹4.00 per brick\n2. Interlock Eco-Brick - ₹6.00 per brick\n3. Tile/Flat Eco-Brick - ₹5.00 per brick\n\nAll are water-resistant, strong, and heat-tested. Visit our Products page for full details!",
  "what bricks do you make": "We make three types: Standard Eco-Brick (₹4.00), Interlock Eco-Brick (₹6.00), and Tile/Flat Eco-Brick (₹5.00). Each type has specific uses and strengths. Check our Products page for specifications!",
  "brick types": "Standard (₹4.00) - for general construction\nInterlock (₹6.00) - connects without mortar\nTile/Flat (₹5.00) - for facades and floors\n\nAll are 100% recycled plastic, waterproof, and durable.",
  "are these strong": "Yes! Our bricks have >12 MPa compression strength — 3× stronger than clay bricks. Lab-tested and proven in real projects including homes, bathrooms, and community spaces.",
  "are these waterproof": "Yes, they have <1% water absorption. They're completely waterproof and ideal for all weather conditions, including monsoon seasons.",
  "waterproof": "Yes, our bricks have very low water absorption (<1%). They float rather than soak water during flooding, making them ideal for flood-prone areas.",
  "can i buy online": "Online ordering is coming soon! For now, contact us via the Contact page for bulk orders or inquiries. We'll respond within 24 hours.",
  "how much does each brick cost": "Standard: ₹4.00, Interlock: ₹6.00, Tile/Flat: ₹5.00 per brick. Bulk pricing available for orders over 100 bricks. Contact us for custom quotes!",
  "price": "Standard: ₹4.00, Interlock: ₹6.00, Tile/Flat: ₹5.00 per brick. Bulk orders get better pricing. Contact us for details!",
  "pricing": "Our pricing is affordable and competitive:\n• Standard Brick: ₹4.00\n• Interlock Brick: ₹6.00\n• Tile/Flat Brick: ₹5.00\n\nBulk discounts available!",
  "difference between brick types": "Standard is for general construction like walls and structures. Interlock connects without mortar, saving time and cost. Tile/Flat is for facades, floors, and decorative applications.",
  "durability": "Our bricks are long-lasting, weather-resistant, and tested for compression strength. They're stronger than traditional clay bricks and withstand Indian climate conditions.",
  "safety": "Yes, our bricks are completely safe. Tested for compression, heat, and water absorption. No toxic fumes in the final product. Safe for homes and communities.",
  "do they melt": "No, they're engineered to withstand Indian climate including high temperatures. They handle heat and rain effectively without deforming.",
  "heat": "Our bricks are heat-resistant and engineered to withstand Indian climate conditions including extreme summer temperatures.",
  "water absorption": "Less than 1% water absorption. They're waterproof and ideal for all weather conditions, including heavy monsoon rains.",
  "compression strength": "Our bricks have >12 MPa compression strength, which is 3× stronger than traditional clay bricks. Lab-tested and proven.",
  "specifications": "Visit our Products page for complete specifications including dimensions, strength, water absorption, and more details for each brick type.",
  "sizes": "We offer standard sizes for all brick types. Custom sizes available for bulk orders. Contact us for specific size requirements.",
  "colors": "Our bricks come in standard colors. Custom colors available for bulk orders. Contact us to discuss your color preferences.",

  // 3. Pilot Projects & Impact
  "pilot projects": "We have completed real pilot projects:\n1. Sitting area in a public place for villagers\n2. Free bathroom for a poor family\n3. Garden edging in a home\n\nAll built with eco-bricks and benefiting communities. Visit our Impact page to see photos!",
  "where have your bricks been used": "Real projects in villages across Andhra Pradesh: sitting areas, bathrooms for needy families, and garden edging. All tested and functional. See our Impact page for locations!",
  "what did you build": "We built sitting areas for community gatherings, bathrooms for poor families, and garden structures. All structures are real, tested, and benefiting communities daily.",
  "who benefited": "Villagers, poor families, and entire communities. We've impacted 1,000+ people with our pilot projects. Real families now have better homes and community spaces.",
  "is this real": "Yes, absolutely real! We have completed pilot projects with photos and details on our Impact page. Visit to see real beneficiaries and their stories.",
  "real projects": "Yes, visit our Impact page to see real projects: sitting areas, bathrooms, and garden structures built with eco-bricks. All with photos and beneficiary stories.",
  "impact": "Visit our Impact page to see:\n• Real pilot projects with photos\n• Community transformation stories\n• Beneficiary testimonials\n• Project locations on map\n• Impact numbers and statistics",
  "beneficiaries": "We've helped over 1,000 people through our projects. Real families now have better homes, communities have gathering spaces, and villages have improved infrastructure.",
  "testimonials": "Visit our Impact page to read testimonials from real beneficiaries including Yesu, Srikanth, Naveen, and community members who have benefited from our projects.",
  "community voices": "Check our Impact page for Community Voices section with real testimonials from beneficiaries who share how Eco-Brickster has transformed their lives.",

  // 4. Forms & Registration
  "how to register": "You can join Eco-Brickster in several ways:\n1. Register for Eco-Drive (plastic collection)\n2. Become a Change Maker (volunteer/organizer)\n3. Subscribe for updates\n4. Contact us for partnerships\n\nVisit the respective pages to get started!",
  "eco-drive registration": "Go to the Eco-Drive page, fill the form with your name, email, phone, age, location, and how you'll help collect plastic. You'll receive confirmation email. Our team will contact you!",
  "eco drive": "Eco-Drive is our plastic collection initiative. Register on the Eco-Drive page to join. You'll help collect plastic waste that we convert into bricks. Every contribution matters!",
  "be a change maker": "Visit the Be a Change Maker page and submit the volunteer form. Change Makers help spread awareness, organize drives, and support the movement. Our team will contact you!",
  "change maker": "Change Makers are volunteers who help spread the Eco-Brickster movement. They organize drives, raise awareness, and support communities. Join us on the Change Maker page!",
  "subscribe": "Enter your email in any Subscribe section on the website. You'll receive Eco-Brickster updates, new project announcements, and sustainability news. No spam, only updates!",
  "contact form": "Use the Contact page form for any questions, collaborations, bulk orders, or inquiries. We reply within 24 hours. You'll receive confirmation email after submission.",
  "do i get confirmation": "Yes! After submitting any form, you'll see a confirmation message and receive an email confirmation. Our team contacts you within 24 hours.",
  "confirmation": "Yes, you'll receive email confirmation after form submission. Our team contacts you within 24 hours to discuss next steps.",
  "how to join": "You can join by:\n1. Registering for Eco-Drive\n2. Becoming a Change Maker\n3. Subscribing for updates\n4. Contacting us for partnerships\n\nVisit the respective pages to get started!",

  // 5. Ordering & Catalog
  "how do i order": "Browse products on the Products page. Select a brick to view details. Online ordering will be enabled soon. For now, contact us via the Contact page for bulk orders. We'll respond within 24 hours!",
  "where can i see products": "Visit the Products page to view all brick types, specifications, pricing, and detailed information. You can see photos and technical details for each product.",
  "catalog": "Visit the Products page to see our complete catalog of eco-bricks with details, pricing, and specifications. All products are displayed with images and descriptions.",
  "when will ordering open": "Online ordering is coming soon! For now, contact us via the Contact page for current orders. We handle bulk orders and can discuss your specific needs.",
  "bulk order": "Contact us via the Contact page for bulk orders. We offer better pricing for larger quantities. Minimum order: 100 bricks for retail, 5,000+ for builders/contractors.",
  "minimum order": "Retail orders: minimum 100 bricks. Builder/contractor orders: minimum 5,000+ bricks. Contact us for custom requirements and pricing.",
  "how to place order": "Contact us via the Contact page with your requirements:\n• Brick type and quantity\n• Delivery location\n• Timeline\n\nWe'll respond with pricing and next steps within 24 hours.",
  "order process": "1. Contact us via Contact page\n2. Share your requirements\n3. We'll send pricing and details\n4. Confirm order\n5. We'll deliver to your location\n\nSimple and straightforward!",
  "payment": "We accept various payment methods. Contact us via the Contact page to discuss payment options for your order. We'll provide all details when you inquire.",
  "delivery time": "Local orders: 2-5 days. Bulk orders: 7-21 days depending on project size and location. Contact us for specific delivery timelines.",
  "shipping": "We deliver to locations across India. Delivery time depends on order size and location. Contact us for shipping details and costs.",

  // 6. Impact Numbers & Statistics
  "impact numbers": "Our Impact:\n• Plastic Saved: 120,000+ kg\n• People Impacted: 1,000+\n• Pilot Projects: 10+\n• CO₂ Reduced: 8,200+ kg\n\nVisit our Impact page for detailed statistics!",
  "plastic saved": "We've saved 120,000+ kg of plastic from landfills and oceans. Every brick we make removes plastic waste from the environment permanently.",
  "people impacted": "Over 1,000 people have been directly impacted by our projects. Real families and communities now have better homes and infrastructure.",
  "projects completed": "We have 10+ completed pilot projects with more coming. Each project benefits entire communities and demonstrates the power of eco-bricks.",
  "co2 reduced": "We've reduced 8,200+ kg of CO₂ emissions through our recycling process. Converting waste to bricks is much more sustainable than traditional methods.",
  "statistics": "Visit our Impact page for complete statistics including plastic saved, people impacted, projects completed, and environmental benefits.",
  "numbers": "Our impact numbers:\n• 120,000+ kg plastic saved\n• 1,000+ people impacted\n• 10+ projects completed\n• 8,200+ kg CO₂ reduced\n\nAnd growing every day!",

  // 7. Sustainability & Recycling
  "how do you turn plastic into bricks": "Plastic is collected from communities, cleaned thoroughly, melted at controlled temperatures, reinforced with safe additives, and molded into strong bricks. The process is safe, tested, and environmentally responsible.",
  "recycling process": "Plastic waste is collected, cleaned, melted, reinforced, and molded into durable bricks. The process is environmentally safe and creates valuable building materials from waste.",
  "environmental benefits": "We reduce plastic pollution, prevent waste in landfills, lower CO₂ emissions, and create sustainable building materials. Every brick helps the environment!",
  "why plastic bricks": "Plastic waste is a huge global problem. Converting it to bricks solves pollution while creating valuable construction materials. It's a win-win for environment and communities.",
  "waste to bricks": "We collect plastic waste, clean it thoroughly, process it safely, and mold it into strong, durable construction bricks. Waste becomes valuable building material!",
  "is this harmful": "No, our bricks are completely safe. The final product has no toxic fumes and is tested for safety and durability. Safe for homes and communities.",
  "environmental": "Our bricks are environmentally friendly because they:\n• Remove plastic from landfills\n• Reduce CO₂ emissions\n• Create sustainable materials\n• Support circular economy",
  "sustainability": "Eco-Brickster promotes sustainability by converting waste into valuable materials, reducing pollution, and supporting communities. We're building a sustainable future!",
  "eco friendly": "Yes! Our bricks are 100% eco-friendly - made from recycled plastic, reducing waste and pollution while creating sustainable building materials.",

  // 8. App Information
  "is there an app": "Yes! The Eco-Brickster app is under development. It will have catalog browsing, AR brick visualizer, order tracking, AI assistant, and more. Stay tuned for launch!",
  "app": "Our mobile app is coming soon with features like:\n• Product catalog\n• AR brick visualizer\n• Order tracking\n• AI assistant\n• Custom designs\n\nSubscribe to get notified when it launches!",
  "when is the app launching": "The app is in progress. Launch details will be shared soon. Subscribe to our updates to be notified when the app is available!",
  "app features": "The app will include: catalog browsing, AR brick visualizer to see bricks in your space, order tracking, AI assistant, custom design tools, and more exciting features!",
  "mobile app": "Our mobile app is coming soon! It will make it easy to browse products, visualize bricks in your space with AR, track orders, and get AI assistance. Subscribe for updates!",

  // 9. Map & Locations
  "map": "Visit our Impact page to see an interactive map with all pilot project locations. Each pin shows project details and beneficiary information. See where we're making impact!",
  "pilot project locations": "See all locations on our Impact page map. Projects are in villages across Andhra Pradesh. Each location is marked with project and beneficiary details.",
  "where are projects": "Check our Impact page for a map showing all pilot project locations with details. Projects are spread across villages in Andhra Pradesh, India.",
  "locations": "Our projects are located in villages across Andhra Pradesh. Visit our Impact page to see the interactive map with all project locations and details.",
  "where do you operate": "We operate in Andhra Pradesh, India, with projects in various villages. Visit our Impact page to see specific locations on the interactive map.",

  // 10. Partnerships & Collaboration
  "partnerships": "We partner with NGOs, schools, builders, and CSR teams. Visit our About page to see supported organizations. Contact us for partnership opportunities!",
  "ngos": "We work with HEAL Organisation and other NGOs to reach communities. Visit our About page for details. Contact us if you're an NGO interested in partnering!",
  "schools": "Yes, schools and colleges can join! We offer Eco-Education kits and student innovation programs. Contact us to bring Eco-Brickster to your school!",
  "builders": "We partner with builders and construction companies. Contact us for collaboration opportunities, bulk orders, and to discuss how eco-bricks can work for your projects.",
  "collaboration": "We welcome collaborations with NGOs, schools, builders, CSR teams, and organizations. Contact us via the Contact page to discuss partnership opportunities!",
  "csr": "We work with CSR teams to create sustainable impact. Contact us to discuss CSR partnership opportunities and how we can help achieve your sustainability goals.",
  "partners": "Visit our About page to see our partners including HEAL Organisation and other supporting organizations. Contact us if you want to partner with us!",

  // 11. Support & Contact
  "contact": "You can contact us:\n• Contact page form (we reply within 24 hours)\n• Email: ecobrickster@gmail.com\n• Phone/WhatsApp: +91 9440520641\n\nWe're here to help!",
  "how can i contact": "Visit our Contact page or:\n• Email: ecobrickster@gmail.com\n• Phone/WhatsApp: +91 9440520641\n• Social media: Instagram, LinkedIn, YouTube\n\nWe reply within 24 hours!",
  "response time": "We reply to all inquiries within 24 hours. You'll receive confirmation email immediately after form submission, and our team will contact you soon.",
  "email": "Email us at ecobrickster@gmail.com for any questions, orders, partnerships, or inquiries. We respond within 24 hours.",
  "phone": "Call or WhatsApp us at +91 9440520641. Available Mon-Sat, 9:00 AM - 7:00 PM IST. We're happy to help!",
  "whatsapp": "WhatsApp us at +91 9440520641. We're available Mon-Sat, 9:00 AM - 7:00 PM IST. Quick responses guaranteed!",
  "help": "I'm here to help! Ask me about products, projects, registration, ordering, or visit our Contact page for direct support. You can also email ecobrickster@gmail.com.",
  "support": "We're here to support you! Contact us via:\n• Contact page form\n• Email: ecobrickster@gmail.com\n• Phone: +91 9440520641\n\nWe reply within 24 hours!",
  "social media": "Follow us on:\n• Instagram\n• LinkedIn\n• YouTube\n\nStay updated with our latest projects, impact stories, and sustainability news!",
  "instagram": "Follow us on Instagram for daily updates, project photos, and impact stories. Search for Eco-Brickster!",
  "linkedin": "Connect with us on LinkedIn for professional updates, partnerships, and sustainability news.",
  "youtube": "Subscribe to our YouTube channel for videos about our projects, manufacturing process, and impact stories.",

  // 12. Common Questions & Doubts
  "are these bricks safe": "Yes! Our bricks are tested for compression, heat, and water absorption. They're completely safe and proven in real projects including homes and community spaces.",
  "can i order bricks": "Online ordering is coming soon. For now, contact us via the Contact page for bulk orders. We'll respond with pricing and details within 24 hours.",
  "where can i buy": "Contact us via the Contact page for orders. Online ordering will be available soon. We handle bulk orders and can discuss your specific needs.",
  "sample": "Yes, you can order samples! Contact us via the Contact page to request samples. We'll send you samples so you can see the quality yourself.",
  "delivery": "Local orders: 2-5 days. Bulk orders: 7-21 days depending on project size and location. Contact us for specific delivery timelines.",
  "track orders": "Order tracking will be available in our mobile app (coming soon). For now, contact us for order status updates.",
  "customizable": "Yes! Bricks can be customized in colors, sizes, and strength categories for bulk orders. Contact us to discuss your customization needs.",
  "houses": "Eco-Bricks are ideal for compound walls, pavements, toilet structures, and low-cost housing units. They're strong, waterproof, and perfect for various construction needs.",
  "flooding": "Our bricks have <1% water absorption. They float rather than soak water during flooding, making them ideal for flood-prone areas.",
  "maintenance": "Our bricks require minimal maintenance. They're weather-resistant, don't absorb water, and maintain their strength over time. Much easier than traditional bricks!",
  "warranty": "Contact us via the Contact page to discuss warranty and guarantee details for your specific order. We stand behind our product quality.",
  "quality": "Our bricks are lab-tested for compression strength, water absorption, and heat resistance. They meet high quality standards and are proven in real projects.",
  "certification": "Our bricks are tested and meet quality standards. Contact us for specific certification details relevant to your project requirements.",
  "comparison": "Our bricks are:\n• 3× stronger than clay bricks\n• Waterproof (vs clay absorbs water)\n• Lighter weight\n• Made from recycled waste\n• More durable in weather\n\nContact us for detailed comparison!",

  // 13. Navigation & Pages
  "where is about page": "Click on 'About' in the navigation menu to learn more about Eco-Brickster's story, mission, team, and partners.",
  "show me products": "Visit the Products page from the navigation menu to see all our brick types, specifications, pricing, and detailed information.",
  "where is faq": "Click on 'FAQs' in the navigation menu for frequently asked questions. You can also ask me anything here!",
  "contact form location": "Click on 'Contact' in the navigation menu to find the contact form. You can also email ecobrickster@gmail.com.",
  "impact page": "Visit our Impact page to see:\n• Real pilot projects with photos\n• Community transformation stories\n• Beneficiary testimonials\n• Project locations map\n• Impact statistics",
  "products page": "Visit our Products page to see:\n• All brick types with photos\n• Detailed specifications\n• Pricing information\n• Product features\n• Ordering information",
  "about page": "Visit our About page to learn about:\n• Our mission and vision\n• Company story\n• Team information\n• Partners and supporters\n• Our journey",
  "pages": "Our website has these main pages:\n• Home - Overview and hero section\n• About - Our story and mission\n• Products - Brick catalog\n• Impact - Projects and testimonials\n• Contact - Get in touch\n• Eco-Drive - Join plastic collection\n• Change Maker - Volunteer program\n\nExplore them all!",

  // 14. Greeting & General
  "hello": "Hello! I'm the Eco-Brickster Assistant 👋\n\nI can help you with:\n• Products and pricing\n• Projects and impact\n• Registration and joining\n• Ordering information\n• Sustainability questions\n\nHow can I help you today?",
  "hi": "Hi! I'm here to help with Eco-Brickster. Ask me about products, projects, how to join, ordering, or anything else about our eco-friendly bricks!",
  "hey": "Hey! How can I help you with Eco-Brickster today? I can answer questions about products, projects, registration, ordering, and more!",
  "thanks": "You're welcome! If you have more questions, just ask. You can also visit our Contact page for direct support. Have a great day!",
  "thank you": "You're welcome! Feel free to ask if you need anything else. Visit our Contact page for direct support. Happy to help!",
  "goodbye": "Goodbye! Thanks for visiting Eco-Brickster. Feel free to come back anytime. You can also contact us via the Contact page. Take care!",
  "bye": "Bye! Thanks for chatting. Contact us anytime via the Contact page or email ecobrickster@gmail.com. Have a great day!",
};

function findAnswer(question: string): string {
  const lowerQuestion = question.toLowerCase().trim();
  
  // Direct match
  if (FAQ_ANSWERS[lowerQuestion]) {
    return FAQ_ANSWERS[lowerQuestion];
  }
  
  // Keyword matching - check if question contains any key
  for (const [key, answer] of Object.entries(FAQ_ANSWERS)) {
    if (lowerQuestion.includes(key) && key.length > 3) { // Only match substantial keywords
      return answer;
    }
  }
  
  // Special handling for common patterns
  if ((lowerQuestion.includes("how") && lowerQuestion.includes("join")) || lowerQuestion.includes("how to join")) {
    return FAQ_ANSWERS["how to join"] || "You can join by: 1) Registering for Eco-Drive, 2) Becoming a Change Maker, 3) Subscribing for updates, or 4) Contacting us. Which interests you?";
  }
  
  if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("how much")) {
    return FAQ_ANSWERS["price"] || "Standard: ₹4.00, Interlock: ₹6.00, Tile/Flat: ₹5.00 per brick. Bulk pricing available. Contact us for details.";
  }
  
  if (lowerQuestion.includes("strong") || lowerQuestion.includes("durable") || lowerQuestion.includes("strength")) {
    return FAQ_ANSWERS["are these strong"] || "Yes! Our bricks are 3× stronger than clay bricks with >12 MPa compression strength. They're waterproof, heat-resistant, and long-lasting.";
  }

  if (lowerQuestion.includes("where") && (lowerQuestion.includes("buy") || lowerQuestion.includes("purchase") || lowerQuestion.includes("get"))) {
    return FAQ_ANSWERS["where can i buy"] || "Contact us via the Contact page for orders. Online ordering will be available soon. We handle bulk orders.";
  }

  if (lowerQuestion.includes("what") && lowerQuestion.includes("page")) {
    return FAQ_ANSWERS["pages"] || "Visit our website to explore Home, About, Products, Impact, Contact, Eco-Drive, and Change Maker pages. Each has valuable information!";
  }
  
  // Default response
  return "I can help you with Eco-Brickster products, projects, registration, ordering, sustainability, or navigation. Could you please rephrase your question? I'm here to help with Eco-Brickster related topics!";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { role: "bot", text: "Hello! I'm the Eco-Brickster Assistant 👋\n\nI can help you with:\n• Products and pricing\n• Projects and impact\n• Registration and joining\n• Ordering information\n• Sustainability questions\n\nHow can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    // Simulate bot response delay
    setTimeout(() => {
      const answer = findAnswer(userMessage);
      setMessages(prev => [...prev, { role: "bot", text: answer }]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Eco-Brickster Assistant</h3>
                <p className="text-xs text-emerald-100">Here to help! 👋</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-emerald text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about products, projects, or how to join..."
                  className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="p-2 rounded-lg bg-emerald text-white hover:bg-emerald/90 transition"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Try: "What is Eco-Brickster?", "How to order?", or "Show me products"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
