import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function Download() {
  const handleDownload = () => {
    // Replace this URL with your actual PDF file URL from Vercel Blob storage
    const pdfUrl = "/terimler.pdf"
    // Create a temporary anchor element
    const link = document.createElement("a")
    link.href = pdfUrl
    link.setAttribute("download", "terimler.pdf") // Set the desired file name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button 
      onClick={handleDownload}
      className="flex items-center space-x-2"
      aria-label="Download PDF"
    >
      <FileDown className="h-4 w-4" />
      <span>PDF İndir</span>
    </Button>
  )
}