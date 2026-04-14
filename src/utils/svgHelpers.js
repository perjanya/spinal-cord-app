import * as d3 from 'd3';

export function animateStrokeFlow(svgRoot, tractId) {
  if (!svgRoot) return;
  const path = d3.select(svgRoot).select(`#${tractId}`);
  path
    .interrupt()
    .attr('stroke-dasharray', '8 8')
    .attr('stroke-dashoffset', 0)
    .transition()
    .duration(1800)
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', -16)
    .on('end', () => animateStrokeFlow(svgRoot, tractId));
}

export function getTractMeta(layer, tractId) {
  return layer?.tracts?.find((tract) => tract.id === tractId) ?? null;
}
