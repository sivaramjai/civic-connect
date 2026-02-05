 import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CategorySelector } from '@/components/CategorySelector';
import { IssueCategory } from '@/lib/types';
import { 
  MapPin, 
  Camera, 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
 import { useNavigate } from 'react-router-dom';
 import { useIssues } from '@/contexts/IssueContext';

 const ReportIssue = () => {
   const { toast } = useToast();
   const navigate = useNavigate();
   const { addIssue } = useIssues();
   const fileInputRef = useRef<HTMLInputElement>(null);
   
   const [category, setCategory] = useState<IssueCategory | undefined>();
   const [description, setDescription] = useState('');
   const [address, setAddress] = useState('');
   const [imageFiles, setImageFiles] = useState<File[]>([]);
   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
   const [isLocating, setIsLocating] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    // Simulate getting location
    setTimeout(() => {
      setAddress('123 Main Street, Downtown District');
      setIsLocating(false);
      toast({
        title: 'Location detected',
        description: 'Your current location has been added.',
      });
    }, 1500);
  };

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (!files) return;
     
     const newFiles: File[] = [];
     const newPreviews: string[] = [];
     
     Array.from(files).forEach((file) => {
       if (imageFiles.length + newFiles.length >= 4) return;
       
       // Validate file type
       if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
         toast({
           title: 'Invalid file type',
           description: 'Please upload JPG or PNG images only.',
           variant: 'destructive',
         });
         return;
       }
       
       newFiles.push(file);
       newPreviews.push(URL.createObjectURL(file));
     });
     
     setImageFiles(prev => [...prev, ...newFiles]);
     setImagePreviews(prev => [...prev, ...newPreviews]);
     
     // Reset file input
     if (fileInputRef.current) {
       fileInputRef.current.value = '';
     }
   };
 
   const openFilePicker = () => {
     fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
     // Revoke object URL to prevent memory leak
     URL.revokeObjectURL(imagePreviews[index]);
     setImageFiles(prev => prev.filter((_, i) => i !== index));
     setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

 const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     
     if (!category || !description || !address) {
       toast({
         title: 'Missing information',
         description: 'Please fill in all required fields.',
         variant: 'destructive',
       });
       return;
     }
 
     setIsSubmitting(true);
     
     // Add the issue to shared state
     addIssue({
       title: description.slice(0, 50) + (description.length > 50 ? '...' : ''), // Use description as title
       description,
       category,
       status: 'reported',
       priority: 'medium',
       location: {
         address,
         lat: 0,
         lng: 0,
       },
       images: imagePreviews, // Use local preview URLs for now
       reportedBy: {
         id: 'anonymous',
         name: 'Anonymous Citizen',
       },
     });
     
     setIsSubmitting(false);
     toast({
       title: 'Issue reported successfully!',
       description: 'Your report has been submitted and will be reviewed shortly.',
     });
     navigate('/issues');
   };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Report a Civic Issue
            </h1>
            <p className="text-muted-foreground">
              Help improve your community by reporting issues that need attention.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">1</span>
                  Select Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CategorySelector selected={category} onSelect={setCategory} />
              </CardContent>
            </Card>

             {/* Issue Details */}
             <Card>
               <CardHeader>
                 <CardTitle className="font-heading flex items-center gap-2">
                   <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">2</span>
                   Describe the Issue
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about the issue, including when you noticed it and any safety concerns..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground text-right">{description.length}/1000</p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">3</span>
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      placeholder="Enter the address or use GPS"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                    >
                      {isLocating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      {isLocating ? 'Locating...' : 'Use GPS'}
                    </Button>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="h-48 rounded-lg bg-muted flex items-center justify-center border border-border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Map will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

             {/* Photos */}
             <Card>
               <CardHeader>
                 <CardTitle className="font-heading flex items-center gap-2">
                   <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">4</span>
                   Add Photos (Optional)
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 {/* Hidden file input */}
                 <input
                   ref={fileInputRef}
                   type="file"
                   accept="image/jpeg,image/jpg,image/png"
                   multiple
                   onChange={handleImageUpload}
                   className="hidden"
                 />
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {imagePreviews.map((img, index) => (
                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                      <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                   {imagePreviews.length < 4 && (
                    <button
                      type="button"
                       onClick={openFilePicker}
                      className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                      <Camera className="h-6 w-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Add Photo</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  You can upload up to 4 photos. Accepted formats: JPG, PNG
                </p>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Reporting Guidelines</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Be specific about the location and nature of the issue</li>
                      <li>• Include photos to help officials assess the problem</li>
                      <li>• For emergencies, please call emergency services directly</li>
                      <li>• False reports may result in account suspension</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportIssue;
