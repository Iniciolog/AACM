import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageChange: (imageData: string) => void;
  label?: string;
}

export default function ImageUploader({ currentImage, onImageChange, label }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(currentImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onImageChange('');
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      
      {preview ? (
        <div className="relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-w-xs max-h-48 rounded-md border"
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            data-testid="button-remove-image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-md p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="max-w-xs mx-auto"
            data-testid="input-image-upload"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Upload an image (JPG, PNG, GIF)
          </p>
        </div>
      )}
    </div>
  );
}
