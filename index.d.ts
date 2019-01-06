import { ReadStream } from 'fs';

/**
 * Parse a DICTD dictionary
 * @param dStream A dictionary `.dict` input stream. If file has `.dict.dz` extension, must be first piped through gunzip.
 * @param iStream A dictionary `.index` stream
 */
declare function ParseDictd(
    dStream: ReadStream,
    iStream: ReadStream
): ReadStream;
export = ParseDictd;
