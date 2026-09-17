import { useEffect } from 'react';

export function useSEO({ title, description, image }) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} | Portfolio`;
    }

    // Update meta tags
    const updateMetaTag = (name, content, attribute = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    if (description) {
      updateMetaTag("description", description);
      updateMetaTag("og:description", description, "property");
    }

    if (image) {
      updateMetaTag("og:image", image, "property");
    }
    
    if (title) {
      updateMetaTag("og:title", `${title} | Portfolio`, "property");
    }
  }, [title, description, image]);
}
