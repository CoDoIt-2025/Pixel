import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

if (process.platform === 'linux') {
  const arch = process.arch; // 'x64' or 'arm64'
  console.log(`[setup-bindings] Linux (${arch}) detected. Verifying native dependencies...`);

  const rolldownPkg = arch === 'arm64' 
    ? '@rolldown/binding-linux-arm64-gnu@1.2.16' 
    : '@rolldown/binding-linux-x64-gnu@1.2.16';
  const rolldownTargetDir = arch === 'arm64'
    ? 'node_modules/@rolldown/binding-linux-arm64-gnu'
    : 'node_modules/@rolldown/binding-linux-x64-gnu';
  const binaryName = arch === 'arm64'
    ? 'rolldown-binding.linux-arm64-gnu.node'
    : 'rolldown-binding.linux-x64-gnu.node';

  // 1. Ensure Rolldown binding
  try {
    const targetPath = path.resolve(rolldownTargetDir, binaryName);
    const distPath = path.resolve('node_modules/rolldown/dist', binaryName);

    if (!fs.existsSync(targetPath) || !fs.existsSync(distPath)) {
      console.log(`[setup-bindings] Installing ${rolldownPkg}...`);
      fs.mkdirSync(path.resolve(rolldownTargetDir), { recursive: true });
      fs.mkdirSync(path.resolve('node_modules/rolldown/dist'), { recursive: true });

      execSync(`npm pack ${rolldownPkg}`, { stdio: 'inherit' });
      const tarballs = fs.readdirSync('.').filter(f => f.startsWith('rolldown-binding-') && f.endsWith('.tgz'));
      for (const tgz of tarballs) {
        execSync(`tar -xzf "${tgz}" -C "${rolldownTargetDir}" --strip-components=1`, { stdio: 'inherit' });
        try { fs.unlinkSync(tgz); } catch {}
      }

      if (fs.existsSync(targetPath)) {
        fs.copyFileSync(targetPath, distPath);
        console.log(`[setup-bindings] Rolldown binding successfully linked to dist/${binaryName}`);
      }
    } else {
      console.log('[setup-bindings] Rolldown native binding is already present.');
    }
  } catch (err) {
    console.error('[setup-bindings] Error installing rolldown binding:', err);
  }

  // 2. Ensure Tailwind Oxide binding
  const oxidePkg = arch === 'arm64'
    ? '@tailwindcss/oxide-linux-arm64-gnu@4.3.3'
    : '@tailwindcss/oxide-linux-x64-gnu@4.3.3';
  const oxideTargetDir = arch === 'arm64'
    ? 'node_modules/@tailwindcss/oxide-linux-arm64-gnu'
    : 'node_modules/@tailwindcss/oxide-linux-x64-gnu';

  try {
    if (!fs.existsSync(path.resolve(oxideTargetDir))) {
      console.log(`[setup-bindings] Installing ${oxidePkg}...`);
      fs.mkdirSync(path.resolve(oxideTargetDir), { recursive: true });
      execSync(`npm pack ${oxidePkg}`, { stdio: 'inherit' });
      const tarballs = fs.readdirSync('.').filter(f => f.startsWith('tailwindcss-oxide-') && f.endsWith('.tgz'));
      for (const tgz of tarballs) {
        execSync(`tar -xzf "${tgz}" -C "${oxideTargetDir}" --strip-components=1`, { stdio: 'inherit' });
        try { fs.unlinkSync(tgz); } catch {}
      }
      console.log('[setup-bindings] Tailwind Oxide binding successfully installed.');
    } else {
      console.log('[setup-bindings] Tailwind Oxide native binding is already present.');
    }
  } catch (err) {
    console.error('[setup-bindings] Error installing tailwind oxide binding:', err);
  }
} else {
  console.log('[setup-bindings] Non-Linux platform detected (' + process.platform + '). Skipping native Linux setup.');
}
