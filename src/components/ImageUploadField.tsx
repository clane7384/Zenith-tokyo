import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Trash2, CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';
import { processImageFile } from '../utils/imageUtils';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  aspectRatio?: 'landscape' | 'square' | 'portrait' | 'auto';
  helperText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  aspectRatio = 'landscape',
  helperText
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일(JPG, PNG, WebP 등)만 업로드할 수 있습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const processed = await processImageFile(file, 1920, 1280, 0.85);
      onChange(processed.dataUrl);
      setSuccessMsg(`업로드 완료 (${Math.round(processed.size / 1024)} KB, ${processed.width}x${processed.height}px)`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err?.message || '사진 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // reset input value so re-selecting same file triggers change
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    setSuccessMsg(null);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-montserrat text-stone-300">
          {label} {required && <span className="text-[#C5A059]">*</span>}
        </label>
        <div className="flex items-center gap-1 bg-stone-950 p-0.5 rounded-lg border border-stone-800 text-[11px] font-montserrat">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
              mode === 'upload' ? 'bg-[#C5A059] text-black font-semibold' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>기기 파일 업로드</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
              mode === 'url' ? 'bg-[#C5A059] text-black font-semibold' : 'text-stone-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>웹 URL 링크</span>
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileInputChange}
          />

          {!value ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-[#C5A059] bg-[#C5A059]/10'
                  : 'border-stone-800 bg-stone-950 hover:border-stone-700 hover:bg-stone-900/50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-[#C5A059] border border-stone-800">
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-white">
                  {isLoading ? '사진 최적화 처리 중...' : '클릭하여 PC / 스마트폰에서 사진 선택'}
                </p>
                <p className="text-[11px] text-stone-500 font-montserrat">
                  또는 사진 파일을 이 영역으로 드래그 앤 드롭 (JPG, PNG, WebP 지원)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950 group">
              <div
                className={`w-full overflow-hidden flex items-center justify-center bg-stone-900 ${
                  aspectRatio === 'landscape' ? 'aspect-[16/9]' : aspectRatio === 'square' ? 'aspect-square' : 'max-h-56'
                }`}
              >
                <img
                  src={value}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Overlay action bar */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-[#C5A059] text-black text-xs font-semibold flex items-center gap-1 shadow-lg hover:brightness-110"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>사진 변경</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-1.5 rounded-lg bg-red-950/80 text-red-300 border border-red-800 text-xs flex items-center gap-1 shadow-lg hover:bg-red-900"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>삭제</span>
                </button>
              </div>

              {/* Floating indicator */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>등록 완료</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-[#C5A059]"
            />
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-2 rounded-lg bg-stone-900 hover:bg-red-950/50 text-stone-400 hover:text-red-400 border border-stone-800 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {value && (
            <div className="h-28 rounded-lg overflow-hidden border border-stone-800 bg-stone-950">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      {successMsg && (
        <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
          <CheckCircle2 className="w-3 h-3 shrink-0" />
          <span>{successMsg}</span>
        </p>
      )}
      {error && (
        <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      )}
      {helperText && !error && !successMsg && (
        <p className="text-[11px] text-stone-500">{helperText}</p>
      )}
    </div>
  );
};

interface MultiImageGalleryUploadProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  helperText?: string;
}

export const MultiImageGalleryUpload: React.FC<MultiImageGalleryUploadProps> = ({
  label,
  images = [],
  onChange,
  helperText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (fileList: FileList) => {
    setIsLoading(true);
    setError(null);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.type.startsWith('image/')) {
          const processed = await processImageFile(file, 1920, 1280, 0.85);
          newImages.push(processed.dataUrl);
        }
      }
      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
      }
    } catch (err: any) {
      setError(err?.message || '갤러리 사진 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddUrl = () => {
    const url = prompt('추가할 이미지 URL을 입력하세요:');
    if (url && url.trim()) {
      onChange([...images, url.trim()]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-montserrat text-stone-300">
          {label} ({images.length}장)
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddUrl}
            className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 font-montserrat"
          >
            <LinkIcon className="w-3 h-3" />
            <span>URL 추가</span>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 rounded-lg bg-[#C5A059] text-black text-[11px] font-semibold flex items-center gap-1 shadow hover:brightness-110"
          >
            <Upload className="w-3 h-3" />
            <span>+ 사진 추가 (PC/모바일)</span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
          }
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
      />

      {images.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-800 rounded-xl p-4 text-center cursor-pointer bg-stone-950 hover:border-stone-700 transition-colors"
        >
          <ImageIcon className="w-6 h-6 text-stone-600 mx-auto mb-1" />
          <p className="text-xs text-stone-400">등록된 갤러리 사진이 없습니다.</p>
          <p className="text-[11px] text-stone-600 mt-0.5">클릭하여 여러 장의 준공 사진을 한 번에 업로드할 수 있습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((imgUrl, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-stone-800 bg-stone-900 group">
              <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1.5 rounded-full bg-red-900 text-white hover:bg-red-800"
                  title="사진 삭제"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[9px] text-stone-300 font-mono">
                #{idx + 1}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-stone-800 hover:border-[#C5A059] flex flex-col items-center justify-center text-stone-500 hover:text-[#C5A059] transition-colors bg-stone-950"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Upload className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-montserrat">+ 추가</span>
              </>
            )}
          </button>
        </div>
      )}

      {error && <p className="text-[11px] text-rose-400 font-mono">{error}</p>}
      {helperText && <p className="text-[11px] text-stone-500">{helperText}</p>}
    </div>
  );
};
