import { Terminal, Waves } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function AlertDemo() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
      Please note that all photos uploaded on this app are saved locally in your browser and are not stored on our servers. 
      Additionally, we use Replicate for ML processing, and their privacy policy can be found  
      <a href="https://replicate.com/privacy#:~:text=We%20have%20no%20control%20over,third%20party%20sites%20or%20services.&text=Our%20Services%20are%20not%20intended,information%20from%20Children%20under%2013." target="_blank" className="text-blue-500"> here.</a>      </AlertDescription>
    </Alert>
  )
}
