const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'src/Components/Shared/HomeScrollProgress.tsx',
    'src/Components/Shared/Reveal.tsx',
    'src/Components/Pages/AllTrainer/AllTrainers.tsx',
    'src/Components/Pages/Home/GearArsenal.tsx',
    'src/Components/Pages/Home/NutritionPlan.tsx',
    'src/Components/Pages/Home/Membership.tsx',
    'src/Components/Pages/Home/Testimonials.tsx',
    'src/Components/Pages/Home/Features.tsx',
    'src/Components/Pages/Home/Banner.tsx',
    'src/Components/Pages/BookTrainer/TrainerBookingForm.tsx',
    'src/Components/Pages/BookMembership/MembershipBookingForm.tsx',
    'src/Components/Pages/AllClasses/ClassCard.tsx'
];

for (const file of filesToUpdate) {
    const fullPath = path.join('d:\\AuraForce', file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let updated = false;

        // Replace `import { motion } from "framer-motion"` with `import { m as motion } from "framer-motion"`
        const regex1 = /import\s*\{\s*motion\s*\}\s*from\s*['"]framer-motion['"];?/g;
        if (regex1.test(content)) {
            content = content.replace(regex1, 'import { m as motion } from "framer-motion";');
            updated = true;
        }

        // Replace `import { motion, useScroll, useSpring } from "framer-motion"` 
        const regex2 = /import\s*\{\s*motion\s*,\s*(.*?)\s*\}\s*from\s*['"]framer-motion['"];?/g;
        if (regex2.test(content)) {
            content = content.replace(regex2, 'import { m as motion, $1 } from "framer-motion";');
            updated = true;
        }
        
        // Let's also handle `import { motion, ...` variations just to be safe
        const regex3 = /import\s*\{\s*(.*?)\s*motion\s*(.*?)\}\s*from\s*['"]framer-motion['"];?/g;
        if (regex3.test(content)) {
            content = content.replace(regex3, (match, p1, p2) => {
                if (match.includes('m as motion')) return match; // Already replaced
                let inner = p1 + p2;
                // remove trailing commas
                inner = inner.replace(/,\s*$/, '').replace(/^\s*,\s*/, '').replace(/,\s*,/g, ',');
                return `import { m as motion${inner ? ', ' + inner : ''} } from "framer-motion";`;
            });
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
}
