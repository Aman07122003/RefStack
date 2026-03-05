export const buildResumeText = (profile) => {
    let text = "";
  
    if (profile.bio) {
      text += `Professional Summary:\n${profile.bio}\n\n`;
    }
  
    if (profile.skills?.length) {
      text += "Skills:\n";
      profile.skills.forEach(skill => {
        const values = Object.values(skill).filter(Boolean);
        text += `- ${values.join(", ")}\n`;
      });
      text += "\n";
    }
  
    if (profile.education?.length) {
      text += "Education:\n";
      profile.education.forEach(edu => {
        text += `- ${edu.title} at ${edu.institute} (${edu.startDate?.getFullYear()} - ${edu.endDate?.getFullYear() || "Present"})\n`;
      });
      text += "\n";
    }
  
    if (profile.projects?.length) {
      text += "Projects:\n";
      profile.projects.forEach(project => {
        text += `- ${project.title}: ${project.description}\n`;
        if (project.techStack?.length) {
          text += `  Tech Stack: ${project.techStack.join(", ")}\n`;
        }
      });
      text += "\n";
    }
  
    if (profile.certifications?.length) {
      text += "Certifications:\n";
      profile.certifications.forEach(cert => {
        text += `- ${cert.title} (${cert.issuingOrganization})\n`;
      });
      text += "\n";
    }
  
    return text;
  };