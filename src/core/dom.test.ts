import { describe, it, expect } from 'vitest';
import { q, qa, closest, resolveTarget, getFocusable } from './dom';

describe('dom', () => {
  it('q finds single element', () => {
    document.body.innerHTML = '<div id="a"><span class="x">hi</span></div>';
    expect(q('#a')).not.toBeNull();
    expect(q('.x')?.textContent).toBe('hi');
    expect(q('#missing')).toBeNull();
  });

  it('qa finds all', () => {
    document.body.innerHTML = '<div class="i"></div><div class="i"></div>';
    expect(qa('.i').length).toBe(2);
  });

  it('closest finds ancestor', () => {
    document.body.innerHTML = '<div id="p"><span id="c">x</span></div>';
    const c = document.getElementById('c')!;
    expect(closest(c, '#p')?.id).toBe('p');
    expect(closest(null, '#p')).toBeNull();
  });

  it('resolveTarget finds via data-kairos-target', () => {
    document.body.innerHTML = '<button id="btn" data-kairos-target="#target"></button><div id="target"></div>';
    const btn = document.getElementById('btn')!;
    expect(resolveTarget(btn)?.id).toBe('target');
    btn.removeAttribute('data-kairos-target');
    expect(resolveTarget(btn)).toBeNull();
  });

  it('getFocusable finds focusable', () => {
    document.body.innerHTML = '<div id="c"><button>ok</button><input /><a href=\"#\">link</a><div tabindex=\"0\">t</div><div tabindex=\"-1\">no</div></div>';
    const c = document.getElementById('c')!;
    const els = getFocusable(c);
    expect(els.length).toBe(4);
  });
});
