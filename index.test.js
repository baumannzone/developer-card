import { describe, it, expect } from 'vitest';
import { parseArgs } from './utils.js';

describe('Developer Card', () => {
  describe('parseArgs', () => {
    const getDataProps = (result) => ({
      defaultHandle: result.defaultHandle,
      customName: result.customName,
      handleOverrides: result.handleOverrides
    });

    it('should parse default handle only', () => {
      const result = parseArgs(['myhandle']);
      expect(getDataProps(result)).toEqual({
        defaultHandle: 'myhandle',
        customName: null,
        handleOverrides: {}
      });
      // Verify functions exist
      expect(result.getHandle).toBeDefined();
      expect(result.getDisplayName).toBeDefined();
      expect(result.getWebUrl).toBeDefined();
    });

    it('should parse handle and custom name', () => {
      const result = parseArgs(['myhandle', '"John Doe"']);
      expect(getDataProps(result)).toEqual({
        defaultHandle: 'myhandle',
        customName: '"John Doe"',
        handleOverrides: {}
      });
    });

    it('should parse handle and service overrides', () => {
      const result = parseArgs(['myhandle', 'instagram,twitter=socialhandle']);
      expect(getDataProps(result)).toEqual({
        defaultHandle: 'myhandle',
        customName: null,
        handleOverrides: {
          instagram: 'socialhandle',
          twitter: 'socialhandle'
        }
      });
    });

    it('should parse handle, name, and service overrides', () => {
      const result = parseArgs(['myhandle', '"John Doe"', 'instagram=insta', 'github=ghuser']);
      expect(getDataProps(result)).toEqual({
        defaultHandle: 'myhandle',
        customName: '"John Doe"',
        handleOverrides: {
          instagram: 'insta',
          github: 'ghuser'
        }
      });
    });
  });

  describe('getHandle', () => {
    it('should return default handle when no service specified', () => {
      const { getHandle } = parseArgs(['myhandle']);
      expect(getHandle()).toBe('myhandle');
    });

    it('should return service-specific handle when override exists', () => {
      const { getHandle } = parseArgs(['myhandle', 'github=ghuser']);
      expect(getHandle('github')).toBe('ghuser');
    });

    it('should use instagram handle for threads when not overridden', () => {
      const { getHandle } = parseArgs(['myhandle', 'instagram=insta']);
      expect(getHandle('threads')).toBe('insta');
    });

    it('should use specific threads handle when overridden', () => {
      const { getHandle } = parseArgs(['myhandle', 'instagram=insta', 'threads=threaduser']);
      expect(getHandle('threads')).toBe('threaduser');
    });
  });

  describe('getDisplayName', () => {
    it('should return @handle when no custom name provided', () => {
      const { getDisplayName } = parseArgs(['myhandle']);
      expect(getDisplayName()).toBe('@myhandle');
    });

    it('should return custom name without quotes when provided', () => {
      const { getDisplayName } = parseArgs(['myhandle', '"John Doe"']);
      expect(getDisplayName()).toBe('John Doe');
    });
  });

  describe('getWebUrl', () => {
    it('should return default .dev domain when no override', () => {
      const { getWebUrl, getHandle } = parseArgs(['myhandle']);
      expect(getWebUrl(getHandle)).toBe('myhandle.dev');
    });

    it('should return custom domain when using domain override', () => {
      const { getWebUrl, getHandle } = parseArgs(['myhandle', 'web=.com']);
      expect(getWebUrl(getHandle)).toBe('myhandle.com');
    });

    it('should return full URL when provided', () => {
      const { getWebUrl, getHandle } = parseArgs(['myhandle', 'web=custom.io']);
      expect(getWebUrl(getHandle)).toBe('custom.io');
    });
  });
}); 